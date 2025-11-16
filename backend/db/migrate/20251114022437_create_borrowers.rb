class CreateBorrowers < ActiveRecord::Migration[8.0]
  def change
    create_table :borrowers do |t|
      t.string :id_card, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone_number, null: false
      t.text :address, null: false
      t.timestamps
    end

    add_index :borrowers, :id_card, unique: true
    add_index :borrowers, :phone_number, unique: true
    add_index :borrowers, :email, unique: true
  end
end
