class RemoveTotalPriceFromBookingsTable < ActiveRecord::Migration[7.2]
  def change
    remove_column :bookings, :total_price
  end
end
