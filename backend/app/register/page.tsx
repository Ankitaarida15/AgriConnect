"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    village: "",
    role: "FARMER",
  });

  const handleRegister = async () => {
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful!");
      router.push("/login");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-black text-white p-8 rounded-xl shadow w-96">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Register to join AgriConnect
        </p>

        <input
  type="text"
  placeholder="Name"
  value={form.name}
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }
  className="w-full mt-5 p-2 rounded bg-gray-900 border border-gray-600"
/>

       <input
  type="email"
  placeholder="Email"
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
  className="w-full mt-3 p-2 rounded bg-gray-900 border border-gray-600"
/>
        <input
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
  className="w-full mt-3 p-2 rounded bg-gray-900 border border-gray-600"
/>

       <input
  type="text"
  placeholder="Phone"
  value={form.phone}
  onChange={(e) =>
    setForm({ ...form, phone: e.target.value })
  }
  className="w-full mt-3 p-2 rounded bg-gray-900 border border-gray-600"
/>

        <input
  type="text"
  placeholder="Village"
  value={form.village}
  onChange={(e) =>
    setForm({ ...form, village: e.target.value })
  }
  className="w-full mt-3 p-2 rounded bg-gray-900 border border-gray-600"
/>

<select
  value={form.role}
  onChange={(e) =>
    setForm({ ...form, role: e.target.value })
  }
  className="w-full mt-3 p-2 rounded bg-gray-900 border border-gray-600"
>
  <option value="FARMER">Farmer</option>
  <option value="BUYER">Buyer</option>
</select>

<button
  onClick={handleRegister}
  className="w-full mt-5 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded"
>
  Register
</button>

      </div>

    </main>
  );
}