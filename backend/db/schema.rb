# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_11_14_145613) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "loan_status", ["reserved", "borrowed", "returned", "cancelled", "lost", "damaged"]

  create_table "authors", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "publisher_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["publisher_id"], name: "index_authors_on_publisher_id"
  end

  create_table "books", force: :cascade do |t|
    t.text "title", null: false
    t.string "isbn", limit: 13, null: false
    t.integer "total_borrow", default: 0, null: false
    t.integer "total_books", default: 0, null: false
    t.bigint "author_id", null: false
    t.bigint "publisher_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_books_on_author_id"
    t.index ["isbn"], name: "index_books_on_isbn", unique: true
    t.index ["publisher_id"], name: "index_books_on_publisher_id"
  end

  create_table "borrowers", force: :cascade do |t|
    t.string "id_card", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone_number", null: false
    t.text "address", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_borrowers_on_email", unique: true
    t.index ["id_card"], name: "index_borrowers_on_id_card", unique: true
    t.index ["phone_number"], name: "index_borrowers_on_phone_number", unique: true
  end

  create_table "loans", force: :cascade do |t|
    t.enum "status", default: "reserved", null: false, enum_type: "loan_status"
    t.datetime "due_at", null: false
    t.datetime "returned_at"
    t.datetime "borrowed_at", null: false
    t.bigint "book_id", null: false
    t.bigint "borrower_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_loans_on_book_id"
    t.index ["borrower_id"], name: "index_loans_on_borrower_id"
    t.index ["borrower_id"], name: "uniq_borrower_active_loan", unique: true, where: "(status = 'borrowed'::loan_status)"
  end

  create_table "publishers", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "authors", "publishers"
  add_foreign_key "books", "authors"
  add_foreign_key "books", "publishers"
  add_foreign_key "loans", "books"
  add_foreign_key "loans", "borrowers"
end
