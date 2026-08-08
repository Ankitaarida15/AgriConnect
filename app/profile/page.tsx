"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("PROFILE PAGE RUNNING");

    const userData = localStorage.getItem("user");

    console.log("USER FROM STORAGE:", userData);

    if (userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading profile...
        </h1>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            User not found
          </h1>

          <p className="mt-2 text-gray-600">
            Please login again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">

          <div className="w-24 h-24 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {user.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {user.role || "User"}
          </p>

        </div>

        <div className="space-y-5">

          <div>
            <label className="font-semibold text-gray-700">
              Name
            </label>

            <p className="border rounded-lg p-3 mt-1 text-gray-700">
              {user.name || "Not provided"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Email
            </label>

            <p className="border rounded-lg p-3 mt-1 bg-gray-100 text-gray-700">
              {user.email || "Not provided"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Phone
            </label>

            <p className="border rounded-lg p-3 mt-1 text-gray-700">
              {user.phone || "Not provided"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Village
            </label>

            <p className="border rounded-lg p-3 mt-1 text-gray-700">
              {user.village || "Not provided"}
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}