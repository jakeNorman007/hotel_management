class CreateBookings < ActiveRecord::Migration[7.2]
  def change
    create_table :bookings do |t|
      t.integer :number_of_nights, null: false
      t.integer :number_of_guests, null: false
      t.float :total_price, null: false
      t.string :status, null: false
      t.boolean :is_paid, null: false
      t.references :room, null: false, foreign_key: true
      t.references :guest, null: false, foreign_key: true

      t.timestamps
    end
  end
end
