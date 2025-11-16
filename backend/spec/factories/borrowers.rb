FactoryBot.define do
  factory :borrower do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    id_card { Faker::Number.number(digits: 8).to_s }
    phone_number { Faker::PhoneNumber.phone_number }
    address { Faker::Address.city }
  end
end
