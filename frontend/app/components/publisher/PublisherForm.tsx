'use client'
import { useState } from 'react'
import { api } from '../../../lib/api'

export default function PublisherForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.createPublisher({ publisher: { name } })
      setName('')
      handleSuccess(`Created successfully!`);
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to create publisher')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white p-6 rounded shadow mb-9">
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="publisher-name" className="block text-sm font-medium text-gray-700 mb-1">
            Publisher Name
          </label>
          <input
            id="publisher-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter publisher name"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating...' : 'Create Publisher'}
        </button>
      </form>
    </section>
  )
}
