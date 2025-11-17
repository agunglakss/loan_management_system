'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader(){
  const pathname = usePathname();

  return(
    <div className="flex items-center justify-between mb-5">
      <nav className="flex gap-3">
        <Link
          className={`px-3 py-2 rounded text-blue-400 border-blue-400 ${pathname === "/admin" ? "bg-blue-600 text-white" : "bg-white border"}`}
          href="/admin"
        >
          Home
        </Link>
        <Link
          className={`px-3 py-2 rounded text-blue-400 border-blue-400 ${pathname === "/admin/publisher" ? "bg-blue-600 text-white" : "bg-white border"}`}
          href="/admin/publisher"
        >
          Publisher
        </Link>
        <Link
          className={`px-3 py-2 rounded text-blue-400 border-blue-400 ${pathname === "/admin/author" ? "bg-blue-600 text-white" : "bg-white border"}`}
          href="/admin/author"
        >
          Author
        </Link>
        <Link
          className={`px-3 py-2 rounded text-blue-400 border-blue-400 ${pathname === "/admin/book" ? "bg-blue-600 text-white" : "bg-white border"}`}
          href="/admin/book"
        >
          Book
        </Link>
      </nav>
    </div>
  )
}