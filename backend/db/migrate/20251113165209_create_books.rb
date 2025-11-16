class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.text :title, null: false
      t.string :isbn, null: false, limit: 13
      t.integer :total_borrow, null: false, default: 0
      t.integer :total_books, null: false, default: 0
      t.references :author, null: false, foreign_key: true
      t.references :publisher, null: false, foreign_key: true
      t.timestamps
    end

    add_index :books, :isbn, unique: true
  end
end
