Rails.application.routes.draw do
  authenticated do
    resources :questions do
      resources :answers do
        member do
          patch :select_answer
        end
      end
      member do
        post :submit_answer
      end
    end
    
  end
  
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "welcome#welcome", as: :welcome
end
