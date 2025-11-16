class Book < ApplicationRecord
  belongs_to :author
  belongs_to :publisher

  def available_count
    # 10 - 10
    total_books - total_borrow
  end
end
