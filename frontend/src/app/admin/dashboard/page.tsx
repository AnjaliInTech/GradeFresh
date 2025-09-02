"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Package, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Calendar,
  RefreshCw,
  Home,
  Settings,
  FileText,
  Shield,
  LogOut,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError("Failed to load dashboard data");
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { name: "Manage Users", icon: Users, href: "/admin/users" },
    { name: "Manage Products", icon: Package, href: "/admin/products" },
    { name: "View Reports", icon: FileText, href: "/admin/reports" },
    { name: "System Settings", icon: Settings, href: "/admin/settings" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#036424]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchAdminStats}
            className="bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2 inline" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#feffdd] border-r border-green-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-25 px-4 ">
            <div className="flex items-center space-x-2">
              {/* Logo Image */}
              <div className="relative w-50 h-25">
                <Image
                  src="/logo.png" // Update this path to your actual logo
                  alt="GradeFresh Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className="w-full flex items-center px-4 py-3 text-[#02521c] hover:bg-[#036424] hover:text-white rounded-lg transition-colors duration-200"
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 ">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 bg-gradient-to-l from-[#a3d920] to-[#036424] text-white hover:text-white rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="flex-1 lg:hidden">
              <div className="flex items-center justify-center">
                {/* Mobile Logo */}
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src="/logo.png" // Update this path to your actual logo
                    alt="GradeFresh Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-gray-800">GradeFresh</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-[#02521c]">ADMIN DASHBOARD</h1>
              <p className="text-black">Welcome back, Administrator</p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center px-4 py-2 bg-gradient-to-l from-[#a3d920] to-[#036424] text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Users"
              value={stats?.total_users || 0}
              color="bg-blue-500"
            />
            <StatCard
              icon={Users}
              title="Exporters"
              value={stats?.exporters || 0}
              color="bg-green-500"
            />
            <StatCard
              icon={Users}
              title="Importers"
              value={stats?.importers || 0}
              color="bg-yellow-500"
            />
            <StatCard
              icon={Users}
              title="Inspectors"
              value={stats?.inspectors || 0}
              color="bg-red-500"
            />
            <StatCard
              icon={Package}
              title="Total Products"
              value={stats?.total_products || 0}
              color="bg-purple-500"
            />
            <StatCard
              icon={Users}
              title="Admins"
              value={stats?.admins || 1}
              color="bg-indigo-500"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => router.push("/admin/users")}
                className="flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-blue-800 font-medium">Manage Users</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-green-800 font-medium">View Reports</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <Package className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-purple-800 font-medium">Manage Products</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                <Settings className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-orange-800 font-medium">System Settings</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;