'use client'

interface ReturnModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (status: 'returned' | 'lost' | 'damaged') => void
  bookTitle: string
}

export default function ReturnModal({ isOpen, onClose, onConfirm, bookTitle }: ReturnModalProps) {
  if (!isOpen) return null

  const handleStatusSelect = (status: 'returned' | 'lost' | 'damaged') => {
    onConfirm(status)
    onClose()
  }

  return (
    <div className="fixed inset-1 bg-opacity-100 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-2">Return Book</h2>
        <p className="text-gray-600 mb-4">Book Title: <span className="font-medium">{bookTitle}</span></p>
        
        <div className="space-y-2 mb-6">
          <button
            onClick={() => handleStatusSelect('returned')}
            className="w-full px-4 py-3 border-2 text-gray-800 border-green-400 rounded hover:bg-green-500 hover:border-green-500 transition-colors text-left font-bold cursor-pointer"
          >
            Returned (Good Condition)
          </button>
          
          <button
            onClick={() => handleStatusSelect('damaged')}
            className="w-full px-4 py-3 border-2 text-gray-800 border-yellow-400 rounded hover:bg-yellow-500 hover:border-yellow-500 transition-colors text-left font-bold cursor-pointer"
          >
            Damaged
          </button>
          
          <button
            onClick={() => handleStatusSelect('lost')}
            className="w-full px-4 py-3  border-2 text-gray-800 border-red-600 rounded hover:bg-red-500 hover:border-red-500 transition-colors text-left font-bold cursor-pointer"
          >
            Lost
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 font-bold bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
