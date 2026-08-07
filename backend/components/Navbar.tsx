import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">

      {/* Logo */}
      <h1 className="text-xl font-bold text-green-700">
        AgriConnect
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-6 text-green-800 font-medium">

        <Link href="/">Home</Link>

        <Link href="/about">About</Link>

        <Link href="/dashboard">Dashboard</Link>

        <Link
          href="/ai"
          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
        >
          🤖 AI Assistant
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className="hover:text-green-600 transition"
        >
          👤 Profile
        </Link>

      </div>
    </nav>
  );
}