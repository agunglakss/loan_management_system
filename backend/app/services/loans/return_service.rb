module Loans
  class ReturnService
    def self.call(loan:, status: nil)
      loan.with_lock do
        raise ActiveRecord::RecordInvalid.new(loan), "Loan not borrowed" unless loan.status == "borrowed"

        loan.update!(
          returned_at: Time.current,
          status: status
        )
      end

      book = loan.book
      book.lock!
      book.total_borrow -= 1
      book.total_books -= 1 if %w[lost damaged].include?(status)
      book.save!

      loan
    end
  end
end
