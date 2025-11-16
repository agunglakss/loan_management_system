class Api::V1::PublishersController < ApplicationController
  def index
    render json: Publisher.all
  end

  def show
    render json: Publisher.find(params[:id])
  end

  def create
    publisher = Publisher.new(publisher_params)
    if publisher.save
      render json: publisher, status: :created
    else
      render json: { errors: publisher.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    publisher = Publisher.find(params[:id])
    if publisher.update(publisher_params)
      render json: publisher
    else
      render json: { errors: publisher.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    publisher = Publisher.find(params[:id])
    if publisher.destroy
      render json: { message: "Publisher deleted" }
    else
      render json: { errors: publisher.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def publisher_params
    params.require(:publisher).permit(:name)
  end
end
