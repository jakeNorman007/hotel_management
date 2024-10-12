class V1::GuestsController < ApplicationController
  def index
    @guests = Guest.paginate(page: params[:page], per_page: params[:per_page] || 10)
    render json: { 
      guests: @guests,
      meta: pagination_meta(@guests),
    }, status: :ok
  end

  def show
    @guests = Guest.find(params[:id])
    render json: @guests, status: :ok
  end

  def create
    @guests = Guest.create!(guest_params)
    render json: @guests, status: :created
  end

  def update
    @guests = Guest.find(params[:id])
    @guests.update!(guest_params)
    render json: @guests, status: :ok
  end

  def destroy
    Guest.find(params[:id]).destroy
    render json: @guests, status: :ok
  end

  private

  def guest_params
    params.require(:guest).permit(:first_name, :last_name, :email)
  end

  def pagination_meta(guests)
    {
      total_pages: guests.total_pages,
      current_page: guests.current_page,
      next_page: guests.next_page,
      prev_page: guests.current_page > 1 ? guests.current_page - 1 : nil,
      total_count: guests.total_entries
    }
  end
end
