class V2::RoomsController < ApplicationController
  def index
    @rooms = Room.all
    render json: @rooms, status: :ok
  end
end
