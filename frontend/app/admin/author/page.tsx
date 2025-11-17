'use client'

import { useRef } from 'react'
import PublisherForm from "@/app/components/author/AuthorForm"
import AuthorTable from '@/app/components/author/AuthorTable'

export default function AuthorPage() {
  const tableRef = useRef<{ refresh: () => void }>(null)

  const handleSuccess = () => {
    tableRef.current?.refresh()
  }

  return(
    <>
      <h2 className="font-bold text-xl mb-4">Create New Author</h2>
      <PublisherForm onSuccess={handleSuccess} />
      <h2 className="font-bold text-xl mb-4">List Authors</h2>
      <AuthorTable ref={tableRef} />
    </>
  )
}