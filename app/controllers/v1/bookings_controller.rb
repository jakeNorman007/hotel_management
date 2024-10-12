class V1::BookingsController < ApplicationController
  def index
    @bookings = Booking.paginate(page: params[:page], per_page: params[:per_page] || 10 )
    render json: { 
      bookings: @bookings,
      meta: pagination_meta(@bookings),
    }, status: :ok
  end

  def show
    @bookings = Booking.find(params[:id])
    render json: @bookings, status: :ok
  end

  def create
    @bookings = Booking.create!(booking_params)
    render json: @bookings, status: :ok
  end

  def update
    @bookings = Booking.find(params[:id])
    @bookings.update!(booking_params)
    render json: @bookings, status: :ok
  end

  def destroy
    Booking.find(params[:id]).destroy
    render json: @bookings, status: :ok
  end

  private

  def booking_params
    params.require(:booking).permit(:number_of_nights, :number_of_guests, :total_price, :status, :is_paid, :room_id, :guest_id)
  end

  def pagination_meta(bookings)
    {
      total_pages: bookings.total_pages,
      current_page: bookings.current_page,
      next_page: bookings.next_page,
      prev_page: bookings.current_page > 1 ? bookings.current_page - 1 : nil,
      total_count: bookings.total_entries
    }
  end
end
