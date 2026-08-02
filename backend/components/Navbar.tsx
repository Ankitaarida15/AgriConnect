import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-green-100 shadow">

      <h1 className="text-xl font-bold text-green-700">
        AgriConnect
      </h1>

      <div className="flex gap-6 text-green-800 font-medium">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>

        {/* AI Assistant */}
        <Link
          href="/ai"
          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
        >
          🤖 AI Assistant
        </Link>
<div className="flex items-center gap-3">
  <Link
    href="/login"
    className="hover:text-green-600 transition"
  >
    Login
  </Link>

  <Link
    href="/register"
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
  >
    Register
  </Link>
</div>
      </div>

    </nav>
  );
}