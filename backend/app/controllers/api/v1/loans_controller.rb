class Api::V1::LoansController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :set_loan, only: [ :show, :pickup, :return, :cancel ]

  def index
    loans = Loan.all.includes(:book, :borrower)
    render json: loans.as_json(include: { book: { only: [:id, :title] }, borrower: { only: [:id, :name] } })
  end

  def show
    loan = Loan.find(params[:id])
    render json: loan.as_json(include: { book: { only: [:id, :title] }, borrower: { only: [:id, :name] } })
  end

  def create
    book_id = params[:book_id]
    borrower_id = params[:borrower_id]
    due_at = params[:due_at]

    book = Book.find(book_id)
    borrower = Borrower.find(borrower_id)

    due_at = parse_datetime(due_at)
    return render json: { error: "Invalid due_at" }, status: :unprocessable_entity unless due_at

    loan = Loans::ReserveService.call(
      book: book,
      borrower: borrower,
      due_at: due_at
    )

    render json: loan, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def pickup
    loan = Loans::PickupService.call(loan: @loan)
    render json: loan, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def cancel
    if @loan.status != "reserved"
      return render json: { error: "Only reserved loans can be cancelled" }, status: :unprocessable_entity
    end

    Loan.transaction do
      @loan.update!(status: "cancelled")

      book = @loan.book
      book.lock!
      book.total_borrow -= 1
      book.save!
    end

    render json: { message: "Loan cancelled" }, status: :ok
  end

  def return
    status = params[:status]
    loan = Loans::ReturnService.call(loan: @loan, status: status)

    render json: loan, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private
  def set_loan
    @loan = Loan.find(params[:id])
  end

  def parse_datetime(val)
    Time.zone.parse(val) rescue nil
  end

  def render_not_found(error)
    render json: { error: error.model || 'Record', message: 'Not found' }, status: :not_found
  end
end
