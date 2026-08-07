"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    alert("Google Login Successful!");
    router.push("/dashboard");
  }
}, [router]);

const [form, setForm] = useState({
  email: "",
  password: "",
 });

  const handleLogin = async () => {
  try {
const response = await fetch("https://agriconnect-x8no.onrender.com/login", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
console.log("Login Response:", data);
console.log("USER:", data.user);
console.log("TOKEN:", !!data.token);

    if (response.ok) {
  localStorage.setItem("token", data.token);

  // Save user details
  localStorage.setItem("user", JSON.stringify(data.user));

  alert("Login Successful!");

  router.push("/dashboard");
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
          Login
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Login to access your AgriConnect account
        </p>

        <input
  type="email"
  placeholder="Email"
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
  className="w-full mt-6 p-2 border border-gray-600 bg-gray-900 text-white rounded"
/>

   <input
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
  className="w-full mt-4 p-2 border border-gray-600 bg-gray-900 text-white rounded"
/>     

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded"
        >
          Login
        </button>

        <a href="https://agriconnect-x8no.onrender.com/auth/google">
  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
    Continue with Google
  </button>
</a>
        
     <p className="text-center mt-4 text-gray-300">
  Don't have an account?{" "}
  <span
    onClick={() => router.push("/register")}
    className="text-green-400 cursor-pointer"
  >
    Register
  </span>
</p>

      </div>
    </main>
  );
}

