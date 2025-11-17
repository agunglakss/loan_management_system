module Loans
  class ReserveService
    def self.call(book:, borrower:, due_at:)
      ActiveRecord::Base.transaction do
        book.lock!

        raise ActiveRecord::RecordInvalid.new(book), "No books available" if book.available_count <= 0

        if Loan.active.where(borrower: borrower).exists?
          raise ActiveRecord::RecordInvalid.new(borrower), "Borrower already has active loan"
        end

        borrowed_at = Time.current + 2.days

        if due_at > borrowed_at + 29.days
          raise ActiveRecord::RecordInvalid.new(Loan.new), "Due date cannot exceed 30 days from reservation"
        end

        loan = Loan.create!(
          book: book,
          borrower: borrower,
          status: "reserved",
          borrowed_at: borrowed_at,
          due_at: due_at
        )

        book.total_borrow += 1
        book.save!

        loan
      end
    end
  end
end
