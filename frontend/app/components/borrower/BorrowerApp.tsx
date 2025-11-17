"use client";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import ReserveForm from "./ReserveForm";
import { api } from "../../../lib/api";

interface Book {
  id: number;
  title: string;
  isbn: string;
  author?: { name: string };
  total_books?: number;
  total_borrow?: number;
}

export default function BorrowerApp() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selected, setSelected] = useState<Book | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    try {
      const result = await api.getBooks();
      setBooks(result || []);
    } catch (e: any) {
      console.error("Failed to fetch books:", e);
      setBooks([]);
      setMsg({ type: "error", text: e.message || "Failed to load books" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {msg && (
        <div
          className={`p-2 rounded mb-4 ${msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
        >
          {msg.text}
        </div>
      )}

      {selected && (
        <ReserveForm
          book={selected}
          onClose={() => {
            setSelected(null);
            fetchBooks();
          }}
          setMsg={setMsg}
        />
      )}

      {loading && <div className="text-center py-4">Loading books...</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {books
          .filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))
          .map((b) => (
            <BookCard key={b.id} book={b} onReserve={() => setSelected(b)} />
          ))}
      </div>
    </section>
  );
}
