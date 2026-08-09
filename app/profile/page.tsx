"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  village?: string | null;
  address?: string | null;
  role?: string | null;
  createdAt?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    address: "",
  });

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("PROFILE TOKEN:", token);

        // No token
        if (!token) {
          console.log("❌ NO TOKEN FOUND");
          setError("Please login again.");
          setLoading(false);
          return;
        }

        // Fetch user
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

        // API error
        if (!response.ok) {
          console.error("❌ PROFILE API ERROR:", data);

          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setError("Session expired. Please login again.");
          } else {
            setError(data.message || "Failed to load profile.");
          }

          setLoading(false);
          return;
        }

        // =========================
        // HANDLE USER RESPONSE
        // =========================

        // If API returns { user: {...} }
        const userData = data.user || data;

        console.log("FINAL USER DATA:", userData);

        setUser(userData);

        setForm({
          name: userData.name || "",
          phone: userData.phone || "",
          village: userData.village || "",
          address: userData.address || "",
        });

        localStorage.setItem("user", JSON.stringify(userData));

        setLoading(false);
      } catch (error) {
        console.error("❌ PROFILE ERROR:", error);

        setError(
          "Unable to connect to server. Please refresh and try again."
        );

        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE PROFILE
  // =========================

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

      console.log("UPDATE PROFILE RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Failed to update profile.");
        return;
      }

      // API may return { user: {...} } or directly {...}
      const updatedUser = data.user || data;

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);

      alert(
        "Something went wrong while updating profile."
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-green-600">
            Loading profile...
          </div>

          <p className="text-gray-500 mt-2">
            Please wait
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600">
            Profile Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            {error || "Please login again to view your profile."}
          </p>

          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // PROFILE PAGE
  // =========================

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* ================= HEADER ================= */}

        <div className="text-center mb-8">

          {/* PROFILE INITIAL */}

          <div className="w-24 h-24 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold shadow">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          {/* NAME */}

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {user.name || "User"}
          </h1>

          {/* ROLE */}

          <p className="text-gray-500 mt-1 uppercase font-semibold">
            {user.role || "USER"}
          </p>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="space-y-5">

          {/* NAME */}

          <div>
            <label className="font-semibold text-gray-700">
              Name
            </label>

            {editing ? (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black bg-white"
                placeholder="Enter your name"
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
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black bg-white"
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
                type="text"
                name="village"
                value={form.village}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black bg-white"
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
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 text-black bg-white"
                placeholder="Enter address"
              />
            ) : (
              <p className="border rounded-lg p-3 mt-1 text-gray-700">
                {user.address || "Not provided"}
              </p>
            )}
          </div>

          {/* ROLE */}

          <div>
            <label className="font-semibold text-gray-700">
              Account Type
            </label>

            <p className="border rounded-lg p-3 mt-1 bg-gray-100 text-gray-700 uppercase">
              {user.role || "USER"}
            </p>
          </div>

          {/* ================= BUTTONS ================= */}

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
                  onClick={() => {
                    setEditing(false);

                    setForm({
                      name: user.name || "",
                      phone: user.phone || "",
                      village: user.village || "",
                      address: user.address || "",
                    });
                  }}
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