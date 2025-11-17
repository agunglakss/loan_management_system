# Loan Management System

A full-stack loan management system built with Rails API backend and Next.js frontend.

## Technology Stack

### Backend
- **Ruby**: 3.3.0
- **Rails**: 8.0.4
- **Database**: PostgreSQL
- **Server**: Puma (port 4000)

### Frontend
- **Next.js**: 16.0.3
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4.x

## Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby** 3.3.0
- **PostgreSQL** (version 12 or higher)
- **Node.js** (version 20 or higher)
- **pnpm** (install via `npm install -g pnpm`)


## Backend Setup

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Install Ruby dependencies

```bash
bundle install
```

### 3. Configure Database

Update `config/database.yml` with your PostgreSQL credentials if needed. The default configuration uses:
- Database: `backend_development`
- Username: Your system username
- Port: 5432
- Host: 127.0.0.1

### 4. Create and Setup Database
```bash
# Create the database
rails db:create

# Run migrations
rails db:migrate

# (Optional) Load seed data
rails db:seed
```

### 5. Start the Rails Server
```bash
# Start the server (runs on port 4000)
rails server
```

## Frontend Setup

### 1. Navigate to the frontend directory
```bash
cd frontend
```
### 2. Install dependencies
```bash
pnpm install
```
### 3. Configure Environment Variables (Optional)
Create a `.env.local` file if you need to customize the API URL:
```bash
API_URL=http://127.0.0.1
PORT=4000
```
### 4. Start the Development Server
```bash
pnpm dev
```

The API is available at `http://127.0.0.1:4000/api/v1/`

### Publishers
- `GET /api/v1/publishers` - List all publishers
- `GET /api/v1/publishers/:id` - Get a publisher
- `POST /api/v1/publishers` - Create a publisher
- `PUT /api/v1/publishers/:id` - Update a publisher
- `DELETE /api/v1/publishers/:id` - Delete a publisher

### Authors
- `GET /api/v1/authors` - List all authors
- `GET /api/v1/authors/:id` - Get an author
- `POST /api/v1/authors` - Create an author
- `PUT /api/v1/authors/:id` - Update an author
- `DELETE /api/v1/authors/:id` - Delete an author

### Books
- `GET /api/v1/books` - List all books
- `GET /api/v1/books/:id` - Get a book
- `POST /api/v1/books` - Create a book
- `PUT /api/v1/books/:id` - Update a book
- `DELETE /api/v1/books/:id` - Delete a book

### Borrowers
- `GET /api/v1/borrowers` - List all borrowers
- `GET /api/v1/borrowers/:id` - Get a borrower (On progress)
- `POST /api/v1/borrowers` - Create a borrower
- `PUT /api/v1/borrowers/:id` - Update a borrower (On progress)
- `DELETE /api/v1/borrowers/:id` - Delete a borrower(On progress)

### Loans
- `GET /api/v1/loans` - List all loans
- `GET /api/v1/loans/:id` - Get a loan
- `POST /api/v1/loans` - Create a loan (reserve)
- `POST /api/v1/loans/:id/pickup` - Pickup a reserved loan
- `POST /api/v1/loans/:id/return` - Return a loan
- `POST /api/v1/loans/:id/cancel` - Cancel a loan

## Testing

### Backend Tests (RSpec)
```bash
cd backend
```
```bash
bundle exec rspec
```

1. **Start PostgreSQL** (if not running as a service)
2. **Start Backend**: `cd backend && rails server`
3. **Start Frontend**: `cd frontend && pnpm dev`
4. Access the application at `http://localhost:3000`

### Port Already in Use

- Backend (port 4000): Change in `backend/config/puma.rb` or set `PORT` environment variable
- Frontend (port 3000): Next.js will automatically use the next available port

