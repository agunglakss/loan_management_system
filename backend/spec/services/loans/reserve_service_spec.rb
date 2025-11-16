require "rails_helper"

RSpec.describe Loans::ReserveService do
  let(:book) { create(:book, total_books: 3, total_borrow: 0) }
  let(:borrower) { create(:borrower) }

  it "creates a reservation and reduces stock" do
    due_at = Time.current + 20.days
    loan = Loans::ReserveService.call(book: book, borrower: borrower, due_at: due_at)

    expect(loan.status).to eq("reserved")
    expect(loan.borrowed_at).not_to be_nil

    book.reload
    expect(book.available_count).to eq(2)
  end

  it "blocks borrowers with active loans" do
    due_at = Time.current + 20.days
    Loans::ReserveService.call(book: book, borrower: borrower, due_at: due_at)

    expect {
      Loans::ReserveService.call(book: book, borrower: borrower, due_at: due_at)
    }.to raise_error(ActiveRecord::RecordInvalid)
  end
end
