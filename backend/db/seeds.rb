# Create Publishers
puts "Creating publishers..."
publishers = [
  { name: "Penguin Random House" },
  { name: "HarperCollins" },
  { name: "Simon & Schuster" },
  { name: "Hachette Book Group" },
  { name: "Macmillan Publishers" }
]

created_publishers = publishers.map do |publisher_data|
  Publisher.find_or_create_by!(name: publisher_data[:name])
end
puts "Created #{created_publishers.count} publishers"

# Create Authors
puts "Creating authors..."
authors_data = [
  { name: "J.K. Rowling", publisher: created_publishers[0] },
  { name: "Stephen King", publisher: created_publishers[1] },
  { name: "Dan Brown", publisher: created_publishers[2] },
  { name: "Agatha Christie", publisher: created_publishers[0] },
  { name: "George R.R. Martin", publisher: created_publishers[3] },
  { name: "J.R.R. Tolkien", publisher: created_publishers[4] },
  { name: "Jane Austen", publisher: created_publishers[1] },
  { name: "Ernest Hemingway", publisher: created_publishers[2] }
]

created_authors = authors_data.map do |author_data|
  Author.find_or_create_by!(name: author_data[:name]) do |author|
    author.publisher = author_data[:publisher]
  end
end
puts "Created #{created_authors.count} authors"

# Create Books
puts "Creating books..."
books_data = [
  { title: "Harry Potter and the Philosopher's Stone", isbn: "9780747532699", total_books: 10, total_borrow: 2, author: created_authors[0], publisher: created_publishers[0] },
  { title: "Harry Potter and the Chamber of Secrets", isbn: "9780747538496", total_books: 8, total_borrow: 1, author: created_authors[0], publisher: created_publishers[0] },
  { title: "The Shining", isbn: "9780307743657", total_books: 12, total_borrow: 3, author: created_authors[1], publisher: created_publishers[1] },
  { title: "It", isbn: "9781501142970", total_books: 15, total_borrow: 5, author: created_authors[1], publisher: created_publishers[1] },
  { title: "The Da Vinci Code", isbn: "9780307277671", total_books: 20, total_borrow: 4, author: created_authors[2], publisher: created_publishers[2] },
  { title: "Angels & Demons", isbn: "9781416524793", total_books: 18, total_borrow: 2, author: created_authors[2], publisher: created_publishers[2] },
  { title: "Murder on the Orient Express", isbn: "9780062693662", total_books: 10, total_borrow: 1, author: created_authors[3], publisher: created_publishers[0] },
  { title: "A Game of Thrones", isbn: "9780553103540", total_books: 25, total_borrow: 8, author: created_authors[4], publisher: created_publishers[3] },
  { title: "The Lord of the Rings", isbn: "9780544003415", total_books: 30, total_borrow: 6, author: created_authors[5], publisher: created_publishers[4] },
  { title: "Pride and Prejudice", isbn: "9780141439518", total_books: 12, total_borrow: 0, author: created_authors[6], publisher: created_publishers[1] },
  { title: "The Old Man and the Sea", isbn: "9780684801223", total_books: 8, total_borrow: 1, author: created_authors[7], publisher: created_publishers[2] }
]

created_books = books_data.map do |book_data|
  Book.find_or_create_by!(isbn: book_data[:isbn]) do |book|
    book.title = book_data[:title]
    book.total_books = book_data[:total_books]
    book.total_borrow = book_data[:total_borrow]
    book.author = book_data[:author]
    book.publisher = book_data[:publisher]
  end
end
puts "Created #{created_books.count} books"

# Create Borrowers
puts "Creating borrowers..."
borrowers_data = [
  { name: "John Doe", email: "john.doe@example.com", phone_number: "+1234567890", address: "123 Main Street, New York, NY 10001" },
  { name: "Jane Smith", email: "jane.smith@example.com", phone_number: "+1234567891", address: "456 Oak Avenue, Los Angeles, CA 90001" },
  { name: "Bob Johnson", email: "bob.johnson@example.com", phone_number: "+1234567892", address: "789 Pine Road, Chicago, IL 60601" },
  { name: "Alice Williams", email: "alice.williams@example.com", phone_number: "+1234567893", address: "321 Elm Street, Houston, TX 77001" },
  { name: "Charlie Brown", email: "charlie.brown@example.com", phone_number: "+1234567894", address: "654 Maple Drive, Phoenix, AZ 85001" }
]

created_borrowers = borrowers_data.map do |borrower_data|
  Borrower.find_or_create_by!(email: borrower_data[:email]) do |borrower|
    borrower.name = borrower_data[:name]
    borrower.phone_number = borrower_data[:phone_number]
    borrower.address = borrower_data[:address]
  end
end
puts "Created #{created_borrowers.count} borrowers"
