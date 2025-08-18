"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getUser, logout, isLoggedIn } from "@/utils/auth";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      // No user info → fallback
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <div className="text-xl font-bold">MyLogo</div>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span>Hello, {user?.nickname}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Homepage</h1>
        <p>This is the body content of your homepage.</p>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 text-center">
        <p className="text-sm">© 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
