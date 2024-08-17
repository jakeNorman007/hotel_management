class CreateRooms < ActiveRecord::Migration[7.2]
  def change
    create_table :rooms do |t|
      t.string :room_name, null: false
      t.float :room_price, null: false
      t.integer :max_capacity, null: false
      t.string :description_of_room, null: false

      t.timestamps
    end
  end
end
