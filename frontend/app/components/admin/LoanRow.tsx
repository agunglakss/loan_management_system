'use client'
import { useState } from 'react'
import ReturnModal from './ReturnModal'

interface Loan {
  id: number
  status: 'reserved' | 'borrowed' | 'returned' | 'cancelled' | 'lost' | 'damaged'
  due_at: string
  returned_at?: string | null
  borrowed_at: string
  created_at: string
  updated_at: string
  book: {
    id: number
    title: string
  }
  borrower: {
    id: number
    name: string
  }
}

interface LoanRowProps {
  loan: Loan
  onPickup: (id: number) => void
  onReturn: (id: number, status: 'returned' | 'lost' | 'damaged') => void
}

export default function LoanRow({ loan, onPickup, onReturn }: LoanRowProps) {
  const [showReturnModal, setShowReturnModal] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800'
      case 'borrowed':
        return 'bg-blue-100 text-blue-800'
      case 'returned':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      case 'lost':
      case 'damaged':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = () => {
    if (loan.status !== 'borrowed') return false
    return new Date(loan.due_at) < new Date()
  }

  const handleReturnClick = () => {
    setShowReturnModal(true)
  }

  const handleReturnConfirm = (status: 'returned' | 'lost' | 'damaged') => {
    onReturn(loan.id, status)
  }

  return (
    <> 
      <tr>
        <td className="px-4 py-4 text-left text-gray-500">{loan.book.title}</td>
        <td className="px-4 py-4 text-left text-gray-500">{loan.borrower.name}</td>
        <td className="px-4 py-4 text-left text-gray-500">{formatDate(loan.borrowed_at)}</td>
        <td className="px-4 py-4 text-left text-gray-500">{loan.returned_at ? formatDate(loan.borrowed_at) : "-"}</td>
        <td className="px-4 py-4 text-left text-gray-500">{formatDate(loan.due_at)}</td>
        <td className="px-4 py-4 text-left text-gray-500">
          <span className={`px-4 py-1 rounded text-xs font-medium ${getStatusColor(loan.status)}`}>
            {loan.status.toUpperCase()}
          </span>
        </td>
        <td>
          {loan.status === 'reserved' && (
            <button
              onClick={() => onPickup(loan.id)}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
            >
              Pickup
            </button>
          )}
          {loan.status === 'borrowed' && (
            <button
              onClick={handleReturnClick}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
            >
              Return
            </button>
          )}
        </td>
      </tr>

      <ReturnModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        onConfirm={handleReturnConfirm}
        bookTitle={loan.book.title}
      />
    </>
  )
}
