"use client";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    isbn: string;
    author?: { name: string };
    total_books?: number;
    total_borrow?: number;
  };
  onReserve: () => void;
}

export default function BookCard({ book, onReserve }: BookCardProps) {
  const trimText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const available = (book.total_books || 0) - (book.total_borrow || 0);
  const title = trimText(book.title, 26);
  
  return (
    <div className="rounded overflow-hidden shadow-sm h-50 border border-gray-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-bold text-md">
          Available: <span className="font-bold">{available} Books</span>
        </p>
        <p className="text-gray-700">
          Author: {book.author?.name || "-"}
        </p>
        <p className="text-gray-700">
          ISBN: {book.isbn}
        </p>
      </div>
      <div className="px-6 pt-2 pb-2">
        <button
            onClick={onReserve}
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm disabled:opacity-50 cursor-pointer w-full"
            disabled={available <= 0}
          >
          Reserve book
        </button>
      </div>
    </div>
  );
}
