'use client'

import { useRef } from 'react'
import BookTable from '@/app/components/book/BookTable'
import BookForm from '@/app/components/book/BookForm'

export default function BookPage(){
  const tableRef = useRef<{ refresh: () => void }>(null)

  const handleSuccess = () => {
    tableRef.current?.refresh()
  }

  return(
    <>
      <h2 className="font-bold text-xl mb-4">Create New Book</h2>
      <BookForm onSuccess={handleSuccess} />
      <h2 className="font-bold text-xl mb-4">List Books</h2>
      <BookTable ref={tableRef} />
    </>
  )
}