class V2::GuestsController < ApplicationController
  def index
    @guests = Guest.all
    render json: @guests, status: :ok
  end
end
