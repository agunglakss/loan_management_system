-- Enable required extension
CREATE EXTENSION IF NOT EXISTS "pg_catalog"."plpgsql";

-- Enum definition
CREATE TYPE loan_status AS ENUM ('reserved','borrowed','returned','cancelled','lost','damaged');

-- Tables
CREATE TABLE publishers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE authors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  publisher_id BIGINT NOT NULL REFERENCES publishers(id),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
CREATE INDEX index_authors_on_publisher_id ON authors(publisher_id);

CREATE TABLE books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  isbn VARCHAR(13) NOT NULL UNIQUE,
  total_borrow INTEGER NOT NULL DEFAULT 0,
  total_books INTEGER NOT NULL DEFAULT 0,
  author_id BIGINT NOT NULL REFERENCES authors(id),
  publisher_id BIGINT NOT NULL REFERENCES publishers(id),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
CREATE INDEX index_books_on_author_id ON books(author_id);
CREATE INDEX index_books_on_publisher_id ON books(publisher_id);

CREATE TABLE borrowers (
  id BIGSERIAL PRIMARY KEY,
  id_card VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  phone_number VARCHAR NOT NULL UNIQUE,
  address TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE loans (
  id BIGSERIAL PRIMARY KEY,
  status loan_status NOT NULL DEFAULT 'reserved',
  due_at TIMESTAMP NOT NULL,
  returned_at TIMESTAMP,
  borrowed_at TIMESTAMP NOT NULL,
  book_id BIGINT NOT NULL REFERENCES books(id),
  borrower_id BIGINT NOT NULL REFERENCES borrowers(id),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT uniq_borrower_active_loan UNIQUE (borrower_id) WHERE (status = 'borrowed')
);
CREATE INDEX index_loans_on_book_id ON loans(book_id);
CREATE INDEX index_loans_on_borrower_id ON loans(borrower_id);