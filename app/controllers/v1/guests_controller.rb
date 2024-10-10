class V1::GuestsController < ApplicationController
  def index
    @guests = Guest.paginate(page: params[:page], per_page: 8)
    render json: @guests, status: :ok
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
end
