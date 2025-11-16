"use client";
import { useState, useEffect } from "react";
import { api } from "../../../lib/api";

interface ReserveFormProps {
  book: {
    id: number;
    title: string;
  };
  onClose: () => void;
  setMsg: (msg: { type: "success" | "error"; text: string } | null) => void;
}

interface Borrower {
  id: number;
  name: string;
  id_card: string;
  email?: string;
}

export default function ReserveForm({ book, onClose, setMsg }: ReserveFormProps) {
  const [dueAt, setDueAt] = useState("");
  const [borrowerId, setBorrowerId] = useState("");
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [loadingBorrowers, setLoadingBorrowers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBorrowers() {
      try {
        const data = await api.getBorrowers();
        setBorrowers(data);
      } catch (e: any) {
        setError("Failed to load borrowers");
      } finally {
        setLoadingBorrowers(false);
      }
    }
    fetchBorrowers();
  }, []);

  function validate(): string | null {
    if (!borrowerId) return "Please select a borrower";
    if (!dueAt) return "Due date is required";
    const parsed = Date.parse(dueAt);
    if (isNaN(parsed)) return "Invalid date format";
    // client-side max 30 days from reservation
    const reserved = new Date();
    const max = new Date(reserved.getTime() + 30 * 24 * 3600 * 1000);
    if (new Date(dueAt) > max)
      return "Due date cannot exceed 30 days from reservation";
    return null;
  }

  async function submit() {
    const err = validate();
    if (err) return setError(err);
    setError(null);
    setLoading(true);

    try {
      await api.reserve({ 
        book_id: book.id, 
        borrower_id: parseInt(borrowerId), 
        due_at: dueAt 
      });
      setMsg({ type: "success", text: "Reserved successfully" });
      onClose();
    } catch (e: any) {
      setError(e.message || "Failed to reserve book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-4 p-4 border rounded border-gray-400 bg-white">
      <div className="font-medium mb-2">Book Title: {book.title}</div>

      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      
      <div className="space-y-3">
        <div>
          <label htmlFor="borrower-select" className="block text-sm font-medium text-gray-700 mb-1">
            Borrower
          </label>
          <select
            id="borrower-select"
            value={borrowerId}
            onChange={(e) => setBorrowerId(e.target.value)}
            disabled={loadingBorrowers}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a borrower</option>
            {borrowers.map((borrower) => (
              <option key={borrower.id} value={borrower.id}>
                {borrower.name} {borrower.id_card && `(${borrower.id_card})`}
              </option>
            ))}
          </select>
          {loadingBorrowers && (
            <p className="text-xs text-gray-500 mt-1">Loading borrowers...</p>
          )}
        </div>

        <div>
          <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date Return Book
          </label>
          <input
            id="due-date"
            type="date"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={submit}
            disabled={loading || loadingBorrowers || !borrowerId}
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50 cursor-pointer hover:bg-blue-700 transition-colors"
          >
            {loading ? "Reserving..." : "Reserve"}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-200 rounded text-sm cursor-pointer hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
