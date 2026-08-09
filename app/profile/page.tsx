"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  village?: string;
  address?: string | null;
  role?: string;
  createdAt?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    address: "",
  });

 useEffect(() => {
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("PROFILE TOKEN:", token);

      if (!token) {
        console.log("❌ NO TOKEN FOUND");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://agriconnect-x8no.onrender.com/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ME API STATUS:", response.status);

      const data = await response.json();

      console.log("ME API RESPONSE:", data);

      if (!response.ok) {
        console.error("❌ PROFILE API ERROR:", data);
        setLoading(false);
        return;
      }

      setUser(data);

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        village: data.village || "",
        address: data.address || "",
      });

      localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);

    } catch (error) {
      console.error("❌ PROFILE ERROR:", error);
      setLoading(false);
    }
  };

  loadUser();
}, []);
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSave = async () => {
  if (!user) return;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    const response = await fetch(
      "https://agriconnect-x8no.onrender.com/me",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          village: form.village,
          address: form.address,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setEditing(false);

    alert("Profile updated successfully!");

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    alert("Something went wrong while updating profile.");
  }
};

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">
          Loading profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            User not found
          </h1>

          <p className="mt-2 text-gray-600">
            Please login again to view your profile.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="w-24 h-24 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {user.name || "User"}
          </h1>

          <p className="text-gray-500 mt-1 uppercase">
            {user.role || "User"}
          </p>

        </div>

        {/* DETAILS */}
        <div className="space-y-5">

          {/* NAME */}
          <div>
            <label className="font-semibold text-gray-700">
              Name
            </label>

            {editing ? (
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1 text-gray-700">
                {user.name || "Not provided"}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-semibold text-gray-700">
              Email
            </label>

            <p className="border rounded-lg p-3 mt-1 bg-gray-100 text-gray-700">
              {user.email || "Not provided"}
            </p>
          </div>

          {/* PHONE */}
          <div>
            <label className="font-semibold text-gray-700">
              Phone
            </label>

            {editing ? (
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black"
                placeholder="Enter phone number"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1 text-gray-700">
                {user.phone || "Not provided"}
              </p>
            )}
          </div>

          {/* VILLAGE */}
          <div>
            <label className="font-semibold text-gray-700">
              Village
            </label>

            {editing ? (
              <input
                name="village"
                value={form.village}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black"
                placeholder="Enter village"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1 text-gray-700">
                {user.village || "Not provided"}
              </p>
            )}
          </div>

          {/* ADDRESS */}
          <div>
            <label className="font-semibold text-gray-700">
              Address
            </label>

            {editing ? (
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black"
                placeholder="Enter address"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1 text-gray-700">
                {user.address || "Not provided"}
              </p>
            )}
          </div>

          {/* BUTTON */}
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