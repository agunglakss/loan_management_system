class Author < ApplicationRecord
  belongs_to :publisher

  has_many :books, dependent: :restrict_with_error
  validates :name, presence: true, uniqueness: true
end
