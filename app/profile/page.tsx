"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      console.log("Profile page loaded");

      try {
        // Check saved user
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          const data = JSON.parse(savedUser);

          setUser(data);

          setForm({
            name: data.name || "",
            phone: data.phone || "",
            village: data.village || "",
            address: data.address || "",
          });

          setLoading(false);
          return;
        }


        // Check token
        const token = localStorage.getItem("token");

        console.log("Token:", token);


        if (!token) {
          console.log("No token found");
          router.push("/login");
          return;
        }


        // Fetch profile from backend
        const response = await fetch(
          "https://agriconnect-x8no.onrender.com/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();

        console.log("Profile Response:", data);


        if (!response.ok) {
          console.log("Profile fetch failed");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }


        setUser(data);


        setForm({
          name: data.name || "",
          phone: data.phone || "",
          village: data.village || "",
          address: data.address || "",
        });


        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );


        setLoading(false);


      } catch (error) {

        console.error(
          "Profile error:",
          error
        );

        setLoading(false);
        router.push("/login");

      }
    };


    loadUser();

  }, [router]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

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


    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );


    setEditing(false);


    alert(
      "Profile updated successfully!"
    );

  };



  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-xl font-semibold">
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


          <p className="text-gray-500">

            {user.role || "User"}

          </p>


        </div>



        <div className="space-y-5">


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
                {user.name}
              </p>

            )}

          </div>



          <div>

            <label className="font-semibold text-gray-700">
              Email
            </label>


            <p className="border rounded-lg p-3 mt-1 text-gray-700 bg-gray-100">

              {user.email}

            </p>

          </div>



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
              />

            ) : (

              <p className="border rounded-lg p-3 mt-1 text-gray-700">

                {user.phone || "Not provided"}

              </p>

            )}

          </div>



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
              />

            ) : (

              <p className="border rounded-lg p-3 mt-1 text-gray-700">

                {user.village || "Not provided"}

              </p>

            )}

          </div>



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
              />

            ) : (

              <p className="border rounded-lg p-3 mt-1 text-gray-700">

                {user.address || "Not provided"}

              </p>

            )}

          </div>



          <div>

            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg"
              >
                Edit Profile
              </button>

            ) : (

              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-3 rounded-lg"
              >
                Save Changes
              </button>

            )}

          </div>


        </div>


      </div>


    </main>

  );

}