class Loan < ApplicationRecord
  belongs_to :book
  belongs_to :borrower

  STATUSES = %w[reserved borrowed returned cancelled lost damaged].freeze

  validate :cannot_borrow_if_already_has_active_loan, on: :create
  validate :validate_due_at

  scope :active, -> { where(status: [ "reserved", "borrowed" ]) }
  scope :overdue, -> { where(status: "borrowed").where("due_at < ?", Time.zone.now) }

  private

  def cannot_borrow_if_already_has_active_loan
    active_statuses = %w[reserved borrowed]

    if Loan.where(borrower_id: borrower_id, status: active_statuses).exists?
      errors.add(:borrower, "already has an active loan (reserved or borrowed)")
    end
  end

  def validate_due_at
    return if borrowed_at.blank? || due_at.blank?
    if due_at > borrowed_at + 30.days
      errors.add(:due_at, "cannot exceed 30 days from borrowed date")
    end
  end
end
