'use client'
import { api } from "@/lib/api";
import formatDate from "@/lib/dateFormat";
import { useEffect, useState, useImperativeHandle, forwardRef } from "react"

interface Author {
  id: number
  name: string
  publisher_id: string
  created_at: string
  updated_at: string
}

export default forwardRef(function PublisherTable(props, ref) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAuthor() {
    setLoading(true)
    try{ 
      setAuthors(await api.getAuthors()) 
    } catch(e) { 
      setLoading(true)
      setAuthors([]) 
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: fetchAuthor
  }));

  useEffect(() => {
    fetchAuthor()
  }, []);

  return(
    <section className="bg-white p-6 rounded shadow mb-6">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Publisher ID</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                  <th className="px-4 py-3 text-left">Update At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {
                  loading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    authors.map((author: Author) => (
                      <tr key={author.id}>
                        <td className="px-4 py-3">{author.id}</td>
                        <td className="px-4 py-3">{author.name}</td>
                        <td className="px-4 py-3">{author.publisher_id}</td>
                        <td className="px-4 py-3">{formatDate(author.created_at)}</td>
                        <td className="px-4 py-3">{formatDate(author.updated_at)}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
})