'use client'
import { api } from "@/lib/api";
import formatDate from "@/lib/dateFormat";
import { useEffect, useState, useImperativeHandle, forwardRef } from "react"

interface Book {
  id: number;
  title: string;
  isbn: string;
  author: { name: string };
  publisher: { name: string };
  total_books: number;
  total_borrow: number;
  created_at: string;
  updated_at: string;
}

export default forwardRef(function BookTable(props, ref) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchBook() {
    setLoading(true)
    try{ 
      setBooks(await api.getBooks()) 
    } catch(e) { 
      setLoading(true)
      setBooks([]) 
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: fetchBook
  }));

  useEffect(() => {
    fetchBook()
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
                  <th className="px-4 py-3 text-left">ISBN</th>
                  <th className="px-4 py-3 text-left">Avaiable</th>
                  <th className="px-4 py-3 text-left">Publisher Name</th>
                  <th className="px-4 py-3 text-left">Author Name</th>
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
                    books.map((book: Book) => (
                      <tr key={book.id}>
                        <td className="px-4 py-3">{book.id}</td>
                        <td className="px-4 py-3">{book.title}</td>
                        <td className="px-4 py-3">{book.isbn}</td>
                        <td className="px-4 py-3">{book.total_books - book.total_borrow}</td>
                        <td className="px-4 py-3">{book.publisher.name}</td>
                        <td className="px-4 py-3">{book.author.name}</td>
                        <td className="px-4 py-3">{formatDate(book.created_at)}</td>
                        <td className="px-4 py-3">{formatDate(book.updated_at)}</td>
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