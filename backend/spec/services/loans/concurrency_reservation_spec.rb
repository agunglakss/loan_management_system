# spec/services/concurrency_reservation_spec.rb
require "rails_helper"

RSpec.describe "Concurrency: multiple reservations", type: :integration do
  # This spec uses threads and direct DB connections, so we disable transactional tests here.
  around(:each) do |example|
    original = RSpec.configuration.use_transactional_fixtures
    RSpec.configuration.use_transactional_fixtures = false
    example.run
    RSpec.configuration.use_transactional_fixtures = original
  end

  let!(:author) { create(:author) }
  let!(:publisher) { create(:publisher) }
  let!(:book) { create(:book, author: author, publisher: publisher, total_books: 2, total_borrow: 1) }

  it "allows only one reservation when two users attempt concurrently" do
    borrower1 = create(:borrower)
    borrower2 = create(:borrower)

    results = []
    threads = []

    # Use connection pool inside threads
    2.times do |i|
      threads << Thread.new do
        ActiveRecord::Base.connection_pool.with_connection do
          due_at = Time.current + 10.days
          begin
            if i == 0
              loan = Loans::ReserveService.call(book: Book.find(book.id), borrower: Borrower.find(borrower1.id), due_at: due_at)
              results << { ok: true, loan_id: loan.id, borrower: borrower1.id }
            else
              # small sleep to increase chance of collision
              sleep(0.01)
              loan = Loans::ReserveService.call(book: Book.find(book.id), borrower: Borrower.find(borrower2.id), due_at: due_at)
              results << { ok: true, loan_id: loan.id, borrower: borrower2.id }
            end
          rescue => e
            results << { ok: false, error: e.class.name, message: e.message, borrower_index: i }
          end
        end
      end
    end

    threads.each(&:join)

    # Exactly one success, one failure
    successes = results.select { |r| r[:ok] }
    failures = results.select { |r| !r[:ok] }

    expect(successes.size).to eq(1), "Expected one success but got: #{results.inspect}"
    expect(failures.size).to eq(1), "Expected one failure but got: #{results.inspect}"

    # After threads done, book.total_borrow must be 1 and available_count 0
    book.reload
    expect(book.total_borrow).to eq(2)
    expect(book.available_count).to eq(0)

    # Ensure the loan exists and belongs to the successful borrower
    successful = successes.first
    loan = Loan.find(successful[:loan_id])
    expect(loan.status).to eq("reserved")
    expect([ borrower1.id, borrower2.id ]).to include(loan.borrower_id)
  end
end
