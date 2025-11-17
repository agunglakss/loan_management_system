class CreateLoans < ActiveRecord::Migration[8.0]
  def change
    # reserved => default status of the record and the book not pick up yet
    # borrowed => the book has been pick up by borrower
    # returned => the book has been returned
    # cancelled => the book has been borrowed and not pick up yet however borrowed cancel to borrow
    # lost => the book has been borrowed however the book was lost
    # damaged => the book condition when return is damaged/broken
    reversible do |dir|
      dir.up do
        execute <<~SQL
          CREATE TYPE loan_status AS ENUM ('reserved', 'borrowed', 'returned', 'cancelled', 'lost', 'damaged');
        SQL
      end
      
      dir.down do
        execute <<~SQL
          DROP TYPE IF EXISTS loan_status;
        SQL
      end
    end

    create_table :loans do |t|
      t.column   :status, :loan_status, null: false, default: "reserved"
      t.datetime :due_at, null: false
      t.datetime :returned_at
      t.datetime :borrowed_at, null: false
      t.references :book, null: false, foreign_key: true
      t.references :borrower, null: false, foreign_key: true
      t.timestamps
    end

    # enforce each record only 1 active loan per borrower
    reversible do |dir|
      dir.up do
        execute <<~SQL
          CREATE UNIQUE INDEX uniq_borrower_active_loan
          ON loans (borrower_id)
          WHERE status = 'borrowed';
        SQL
      end
      
      dir.down do
        execute <<~SQL
          DROP INDEX IF EXISTS uniq_borrower_active_loan;
        SQL
      end
    end
  end
end
