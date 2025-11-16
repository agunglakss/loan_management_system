'use client'
import { useState, useEffect } from 'react'
import { api } from '../../../lib/api'

interface Publisher {
  id: number
  name: string
}

export default function AuthorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingPublishers, setLoadingPublishers] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const data = await api.getPublishers()
        setPublishers(data)
      } catch (err) {
        setError('Failed to load publishers')
      } finally {
        setLoadingPublishers(false)
      }
    }
    fetchPublishers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.createAuthor({ author: { name, publisher_id: parseInt(publisherId) } })
      setName('')
      setPublisherId('')
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to create author')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-1">
          Author Name
        </label>
        <input
          id="author-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter author name"
        />
      </div>

      <div>
        <label htmlFor="author-publisher" className="block text-sm font-medium text-gray-700 mb-1">
          Publisher
        </label>
        <select
          id="author-publisher"
          value={publisherId}
          onChange={(e) => setPublisherId(e.target.value)}
          required
          disabled={loadingPublishers}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        >
          <option value="">Select a publisher</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>
        {loadingPublishers && (
          <p className="text-sm text-gray-500 mt-1">Loading publishers...</p>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading || loadingPublishers || !publisherId}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Creating...' : 'Create Author'}
      </button>
    </form>
  )
}
