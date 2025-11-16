FactoryBot.define do
  factory :author do
    name { Faker::Book.author }
    association :publisher
  end
end
