class V1::RoomsController < ApplicationController
  def index
    @rooms = Room.all
    render json: @rooms, status: :ok
  end

  def show
    @rooms = Room.find(params[:id])
    render json: @rooms, status: :ok
  end

  def create
    @rooms = Room.create!(room_params)
    render json: @rooms, status: :ok
  end

  def update
    @rooms = Room.find(params[:id]) 
    @rooms.update!(room_params)
    render json: @rooms, status: :ok
  end

  def destroy
    Room.find(params[:id]).destroy
    render json: @rooms, status: :ok
  end

  private

  def room_params
    params.require(:room).permit(:room_name, :room_price, :max_capacity, :description_of_room)
  end
end
