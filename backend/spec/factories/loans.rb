FactoryBot.define do
  factory :loan do
    association :book
    association :borrower

    borrowed_at { Time.current }
    due_at      { 10.days.from_now }

    status { "reserved" }

    trait :reserved do
      status { "reserved" }
    end

    trait :borrowed do
      status { "borrowed" }
      borrowed_at { 2.days.from_now }
    end

    trait :returned do
      status { "returned" }
      returned_at { Time.current }
    end

    trait :lost do
      status { "lost" }
    end

    trait :damaged do
      status { "damaged" }
    end
  end
end
