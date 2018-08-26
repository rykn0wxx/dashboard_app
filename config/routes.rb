Rails.application.routes.draw do

	get 'index' => 'dashboard#index', :as => 'index'
	get 'theme' => 'dashboard#theme', :as => 'theme'
	get 'login' => 'dashboard#login', :as => 'login'
	get 'register' => 'dashboard#register', :as => 'register'

	root :to => 'dashboard#index'
end
