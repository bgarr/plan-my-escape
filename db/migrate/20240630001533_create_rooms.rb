# frozen_string_literal: true

class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.references :owner, null: false, foreign_key: { to_table: :users }
      t.boolean :public, null: false, default: false

      t.timestamps
    end

    add_index :rooms, :name, unique: true
  end
end
