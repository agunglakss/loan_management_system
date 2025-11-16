"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Library Loan System</h1>
      <nav className="flex gap-3">
        <Link
          className={`px-3 py-2 rounded ${pathname === "/" ? "bg-blue-700 text-white" : "bg-white border"}`}
          href="/"
        >
          Borrower
        </Link>
        <Link
          className={`px-3 py-2 rounded ${pathname === "/admin" ? "bg-blue-700 text-white" : "bg-white border"}`}
          href="/admin"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}
