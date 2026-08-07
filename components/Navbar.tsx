"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLoggedIn(false);

    window.location.href = "/login";
  };

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

        {/* AI Assistant */}
        <Link
          href="/ai"
          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
        >
          AI Assistant
        </Link>

        {loggedIn ? (
          <>
            {/* Profile */}
            <Link
              href="/profile"
              className="hover:text-green-600 transition"
            >
              Profile
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link
              href="/login"
              className="hover:text-green-600 transition"
            >
              Login
            </Link>

            {/* Register */}
            <Link
              href="/register"
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}