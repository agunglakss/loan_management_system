'use client'
import { useState, useEffect } from 'react'
import { api } from '../../../lib/api'

interface Publisher {
  id: number
  name: string
}

interface Author {
  id: number
  name: string
}

export default function BookForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [totalBooks, setTotalBooks] = useState('')
  const [authors, setAuthors] = useState<Author[]>([])
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [authorsData, publishersData] = await Promise.all([
          api.getAuthors(),
          api.getPublishers()
        ])
        setAuthors(authorsData)
        setPublishers(publishersData)
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoadingData(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.createBook({
        book: {
          title,
          isbn,
          author_id: parseInt(authorId),
          publisher_id: parseInt(publisherId),
          total_books: parseInt(totalBooks) || 0,
          total_borrow: 0
        }
      })
      setTitle('')
      setIsbn('')
      setAuthorId('')
      setPublisherId('')
      setTotalBooks('')
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to create book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="book-title" className="block text-sm font-medium text-gray-700 mb-1">
          Book Title
        </label>
        <input
          id="book-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter book title"
        />
      </div>

      <div>
        <label htmlFor="book-isbn" className="block text-sm font-medium text-gray-700 mb-1">
          ISBN (10-13 digits)
        </label>
        <input
          id="book-isbn"
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
          maxLength={13}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter 10-13 digit ISBN"
        />
        <p className="text-xs text-gray-500 mt-1">Must be exactly 10-13 digits</p>
      </div>

      <div>
        <label htmlFor="book-author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <select
          id="book-author"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
          disabled={loadingData}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book-publisher" className="block text-sm font-medium text-gray-700 mb-1">
          Publisher
        </label>
        <select
          id="book-publisher"
          value={publisherId}
          onChange={(e) => setPublisherId(e.target.value)}
          required
          disabled={loadingData}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        >
          <option value="">Select a publisher</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book-total" className="block text-sm font-medium text-gray-700 mb-1">
          Total Books
        </label>
        <input
          id="book-total"
          type="number"
          value={totalBooks}
          onChange={(e) => setTotalBooks(e.target.value)}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter total number of books"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading || loadingData || !authorId || !publisherId}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Creating...' : 'Create Book'}
      </button>
    </form>
  )
}
