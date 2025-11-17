module Loans
  class PickupService
    def self.call(loan:)
      # gunakan lock_with untuk menghindari double update ketika mengklik button pick up
      loan.with_lock do
        raise ActiveRecord::RecordInvalid.new(loan), "Loan is not reserved" unless loan.status == "reserved"

        actual_pickup = Time.current
        due_at = loan.due_at
        borrowed_at = loan.borrowed_at

        if actual_pickup < borrowed_at
          time_shift = actual_pickup - borrowed_at
          due_at = due_at + time_shift
          borrowed_at = actual_pickup
        end

        loan.update!(
          status: "borrowed",
          borrowed_at: borrowed_at,
          due_at: due_at
        )

        loan
      end
    end
  end
end
