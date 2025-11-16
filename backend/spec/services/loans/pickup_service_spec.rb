require "rails_helper"

RSpec.describe Loans::PickupService do
  let(:book) { create(:book, total_books: 3, total_borrow: 0) }
  let(:borrower) { create(:borrower) }

  it "early pick up and sets borrowed_at" do
    due_at = Time.current + 10.days

    loan = Loans::ReserveService.call(book: book, borrower: borrower, due_at: due_at)
    expect(loan.borrowed_at.strftime("%Y-%m-%d %H:%M:%S")).to eq((Time.current + 2.days).strftime("%Y-%m-%d %H:%M:%S"))

    result = Loans::PickupService.call(loan: loan)

    expect(result.status).to eq("borrowed")
    expect(result.borrowed_at).not_to be_nil
    expect((result.borrowed_at + 8.days).strftime("%Y-%m-%d %H:%M:%S")).to eq(result.due_at.strftime("%Y-%m-%d %H:%M:%S"))
  end
end
