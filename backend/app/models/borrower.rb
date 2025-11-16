class Borrower < ApplicationRecord
  before_create :assign_id_card_number

  def assign_id_card_number
    last_id = 1
    borrower = Borrower.last
    if borrower.present?
      last_seq = borrower.lock!
      last_id = last_seq.id + 1
    end

    # Format example: 012025-000001
    year  = Time.current.year
    self.id_card = "#{year.to_s[2..3]}#{year}-%06d" % last_id
  end
end
