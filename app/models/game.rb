# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  has_many :game_rooms, dependent: :nullify
  has_many :rooms, through: :game_rooms

  validates :name, presence: true, uniqueness: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id name updated_at]
  end

  def self.ransackable_associations(_auth_object = nil)
    ['owner']
  end
end
