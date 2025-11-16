import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Library Loan System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <Header />
          <main className="mt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
