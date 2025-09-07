"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  Package, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      
      if (userObj.role !== "admin") {
        router.push("/");
      }
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/signin");
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        fixed md:relative w-64 bg-[#036424] text-white transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        z-50 md:z-auto
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold flex items-center">
              <Shield className="h-8 w-8 mr-2" />
              Admin Panel
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-[#02521c] transition-colors mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Dashboard
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-[#02521c] transition-colors mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-[#02521c] transition-colors mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Package className="h-5 w-5 mr-3" />
              Products
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-3 rounded-lg hover:bg-[#02521c] transition-colors mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 rounded-lg hover:bg-[#02521c] transition-colors w-full text-left mt-8"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <div className="w-8 h-8 bg-[#a3d921] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}