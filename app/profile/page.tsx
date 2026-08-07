"use client";

import { useEffect, useState } from "react";

type User = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  village?: string;
  address?: string;
  role?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    address: "",
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      console.log("PROFILE USER:", savedUser);

      if (!savedUser) {
        setUser(null);
        return;
      }

      const data: User = JSON.parse(savedUser);

      setUser(data);

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        village: data.village || "",
        address: data.address || "",
      });
    } catch (error) {
      console.error("Profile loading error:", error);
      setUser(null);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...form,
    };

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setEditing(false);

    alert("Profile updated successfully!");
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            User not found
          </h1>

          <p className="mt-3 text-gray-600">
            Please login again to view your profile.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Profile Header */}
        <div className="text-center mb-8">

          <div className="w-24 h-24 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h1 className="text-3xl font-bold mt-4">
            {user.name || "User"}
          </h1>

          <p className="text-gray-500">
            {user.role || "User"}
          </p>

        </div>

        {/* Profile Details */}
        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="font-semibold">Name</label>

            {editing ? (
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1">
                {user.name || "Not provided"}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>

            <p className="border rounded-lg p-3 mt-1 bg-gray-100">
              {user.email || "Not provided"}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone</label>

            {editing ? (
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1">
                {user.phone || "Not provided"}
              </p>
            )}
          </div>

          {/* Village */}
          <div>
            <label className="font-semibold">Village</label>

            {editing ? (
              <input
                name="village"
                value={form.village}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1">
                {user.village || "Not provided"}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Address</label>

            {editing ? (
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1">
                {user.address || "Not provided"}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-4">

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">

                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

    </main>
  );
}