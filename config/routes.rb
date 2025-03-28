# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config

  begin
    ActiveAdmin.routes(self)
  rescue ActiveAdmin::DatabaseHitDuringLoad => e
    Rails.logger.info(e)
  end
  # Defines the root path route ("/")
  root 'home#index'

  devise_for :users

  resources :games

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
end
