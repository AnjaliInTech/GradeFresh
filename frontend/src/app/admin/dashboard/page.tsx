"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Package, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    exporters: 0,
    importers: 0,
    inspectors: 0,
    totalProducts: 0,
    revenue: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 1248,
      exporters: 456,
      importers: 342,
      inspectors: 450,
      totalProducts: 1234,
      revenue: 45678
    });

  
  }, []);

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
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          icon={Users}
          title="Exporters"
          value={stats.exporters}
          color="bg-green-500"
        />
        <StatCard
          icon={Users}
          title="Importers"
          value={stats.importers}
          color="bg-yellow-500"
        />
        <StatCard
          icon={Users}
          title="Inspectors"
          value={stats.inspectors}
          color="bg-red-500"
        />
        <StatCard
          icon={Package}
          title="Total Products"
          value={stats.totalProducts}
          color="bg-purple-500"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          color="bg-emerald-500"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Trend</h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart will be here</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Add User
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