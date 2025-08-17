"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, logout } from "@/utils/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login"); // redirect if not logged in
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-500">Hello Tony Nguyen</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
