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
  RefreshCw
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        // Token expired or not admin
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#036424]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchAdminStats}
            className="bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c]"
          >
            <RefreshCw className="h-4 w-4 mr-2 inline" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => router.push("/admin/users")}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Manage Users
          </button>
          <button className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
            View Reports
          </button>
          <button className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors">
            Manage Products
          </button>
          <button className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;