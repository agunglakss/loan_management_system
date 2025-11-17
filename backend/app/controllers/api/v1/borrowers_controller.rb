class Api::V1::BorrowersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def index
    render json: Borrower.all
  end

  def create
    borrower = Borrower.new(book_params)
    if borrower.save
      render json: borrower, status: :created
    else
      render json: { errors: borrower.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:borrower).permit(
      :name, :address,
      :phone_number, :email
    )
  end

  def render_not_found(error)
    render json: { error: error.model || 'Record', message: 'Not found' }, status: :not_found
  end
end
