FactoryBot.define do
  factory :book do
    title { "Sample Book #{SecureRandom.hex(3)}" }
    isbn  { Faker::Number.number(digits: 10).to_s } # always 10–13 chars
    total_books { 5 }
    total_borrow { 0 }

    association :author
    association :publisher
  end
end
