'use client';
import api from "@/utils/axios";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const res = await api.post("/customers/login", { email, password });
      const { token, user } = res.data;

      // store token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successfully!");
      router.push("/"); // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Login
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">{error}</div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-transparent text-white py-2 
                      border-b-2 border-gray-600 focus:border-blue-400 
                      focus:outline-none placeholder-gray-400"
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
              className="w-full bg-transparent text-white py-2 
                        border-b-2 border-gray-600 focus:border-blue-400 
                        focus:outline-none placeholder-gray-400 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-400">
          Don’t have an account?{" "}
            <Link
                href="/signup"
                    className="text-blue-400 hover:underline"
                >
                Sign Up
            </Link>
        </p>
      </form>
    </div>
  );
}
