# frozen_string_literal: true

ActiveAdmin.register Game do
  permit_params :name, :owner_id

  filter :owner, collection: User.all_names

  form do |f|
    f.inputs 'Game Definition' do
      f.input :name
      f.input :owner, as: :select, collection: User.all_names
      render 'games/path_plotter', { game: @game }
    end
    f.actions
  end
end
