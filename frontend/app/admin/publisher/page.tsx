'use client'

import { useRef } from 'react'
import PublisherForm from "@/app/components/publisher/PublisherForm"
import PublisherTable from "@/app/components/publisher/PublisherTable"

export default function PublisherPage() {
  const tableRef = useRef<{ refresh: () => void }>(null)

  const handleSuccess = () => {
    tableRef.current?.refresh()
  }

  return(
    <>
      <h2 className="font-bold text-xl mb-4">Create New Publisher</h2>
      <PublisherForm onSuccess={handleSuccess} />
      <h2 className="font-bold text-xl mb-4">List Publishers</h2>
      <PublisherTable ref={tableRef} />
    </>
  )
}