'use client'
import { useState } from 'react'
import PublisherForm from './PublisherForm'
import AuthorForm from './AuthorForm'
import BookForm from './BookForm'

type TabType = 'publisher' | 'author' | 'book'

export default function DataManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('publisher')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const tabs = [
    { id: 'publisher' as TabType, label: 'Publisher', component: PublisherForm },
    { id: 'author' as TabType, label: 'Author', component: AuthorForm },
    { id: 'book' as TabType, label: 'Book', component: BookForm },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Data Management</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Form */}
      <div className="max-w-md">
        {ActiveComponent && (
          <ActiveComponent
            onSuccess={() => handleSuccess(`${tabs.find(t => t.id === activeTab)?.label} created successfully!`)}
          />
        )}
      </div>
    </section>
  )
}
