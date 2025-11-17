require "rails_helper"

RSpec.describe Loans::ReturnService do
  describe ".call" do
    let(:book) { create(:book, total_books: 5, total_borrow: 1) }
    let(:loan) { create(:loan, :borrowed, book: book, borrowed_at: 3.days.ago, due_at: 7.days.from_now) }

    it "marks the loan returned and frees one borrow slot" do
      expect {
        described_class.call(loan: loan, status: "returned")
      }.to change { book.reload.total_borrow }.by(-1)

      loan.reload
      expect(loan.status).to eq("returned")
      expect(loan.returned_at).not_to be_nil
      expect(book.total_books).to eq(5)
    end

    it "decrements total_books when marked lost" do
      expect {
        described_class.call(loan: loan, status: "lost")
      }.to change { book.reload.total_books }.by(-1)
        .and change { book.reload.total_borrow }.by(-1)
    end

    it "raises if the loan is not currently borrowed" do
      not_borrowed = create(:loan, :reserved, book: book)

      expect {
        described_class.call(loan: not_borrowed, status: "returned")
      }.to raise_error(ActiveRecord::RecordInvalid, "Loan not borrowed")
    end
  end
end