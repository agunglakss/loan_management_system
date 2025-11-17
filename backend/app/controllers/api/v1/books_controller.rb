class Api::V1::BooksController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def index
    books = Book.includes(:author, :publisher)
    render json: books.as_json(
      include: {
        author: { only: [:id, :name] },
        publisher: { only: [:id, :name] }
      },
      methods: :available_count
    )
  end

  def show
    book = Book.find(params[:id])
    render json: book.as_json(
      include: {
        author: { only: [:id, :name] },
        publisher: { only: [:id, :name] }
      },
      methods: :available_count
    )
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      render json: book
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    book = Book.find(params[:id])
    if book.destroy
      render json: { message: "Book deleted" }
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit(
      :title, :isbn,
      :author_id, :publisher_id,
      :total_books, :total_borrow
    )
  end

  def render_not_found(error)
    render json: { error: error.model || 'Record', message: 'Not found' }, status: :not_found
  end
end
