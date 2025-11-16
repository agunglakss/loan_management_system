class Api::V1::AuthorsController < ApplicationController
  def index
    render json: Author.all
  end

  def show
    render json: Author.find(params[:id])
  end

  def create
    author = Author.new(author_params)
    if author.save
      render json: author, status: :created
    else
      render json: { errors: author.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    author = Author.find(params[:id])
    if author.update(author_params)
      render json: author
    else
      render json: { errors: author.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    author = Author.find(params[:id])
    if author.destroy
      render json: { message: "Author deleted" }
    else
      render json: { errors: author.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def author_params
    params.require(:author).permit(:name, :publisher_id)
  end
end
