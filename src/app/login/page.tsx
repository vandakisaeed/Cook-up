'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) throw new Error(data.message || "Login failed");

      router.push(`/register/${data.user.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) throw new Error(data.message || "Registration failed");

      router.push(`/register/${data.user.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Login / Register</h2>
        {error && <div className="text-red-600 text-center">{error}</div>}

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name (required for registration)"
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleLogin}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-medium transition"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
