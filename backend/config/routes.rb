Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :publishers, only: [:index, :show, :create, :update, :destroy]
        resources :authors, only: [:index, :show, :create, :update, :destroy]
        resources :books, only: [:index, :show, :create, :update, :destroy]
        resources :borrowers, only: [:index, :show, :create, :update, :destroy]

        resources :loans, only: [ :index, :show, :create ] do
          post :pickup, on: :member
          post :return, on: :member
          post :cancel, on: :member
        end
      end
    end
  end

end
