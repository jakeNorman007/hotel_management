class V1::RoomsController < ApplicationController
  def index
    @rooms = Room.paginate(page: params[:page], per_page: params[:per_page] || 10)
    render json: {
      rooms: @rooms,
      meta: pagination_meta(@rooms)
    }, status: :ok
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

  def pagination_meta(rooms)
    {
      total_pages: rooms.total_pages,
      current_page: rooms.current_page,
      next_page: rooms.next_page,
      prev_page: rooms.current_page > 1 ? rooms.current_page - 1 : nil,
      total_count: rooms.total_entries
    }
  end
end
