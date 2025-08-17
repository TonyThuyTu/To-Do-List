"use client";
import api from "@/utils/axios";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { login as saveToken } from "@/utils/auth"; // use auth.js helper

export default function SignupPage() {
  const router = useRouter();

  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [nickname, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !nickname || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const res = await api.post("/customers/signup", {
        firstname,
        lastname,
        nickname,
        email,
        password,
      });

      // Save token using auth.js
      saveToken(res.data.token);

      router.push("/"); // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Sign Up
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">{error}</div>
        )}

        {/* Name fields */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">First Name</label>
          <input
            type="text"
            className="w-full bg-transparent text-white py-2 border-b-2 border-gray-600 focus:border-blue-400 focus:outline-none placeholder-gray-400"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your First Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Last Name</label>
          <input
            type="text"
            className="w-full bg-transparent text-white py-2 border-b-2 border-gray-600 focus:border-blue-400 focus:outline-none placeholder-gray-400"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Your Last Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Nickname</label>
          <input
            type="text"
            className="w-full bg-transparent text-white py-2 border-b-2 border-gray-600 focus:border-blue-400 focus:outline-none placeholder-gray-400"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="Your Nickname"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-transparent text-white py-2 border-b-2 border-gray-600 focus:border-blue-400 focus:outline-none placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent text-white py-2 border-b-2 border-gray-600 focus:border-blue-400 focus:outline-none placeholder-gray-400 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
        >
          Sign Up
        </button>

        {/* Footer */}
        {/* <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p> */}
      </form>
    </div>
  );
}
