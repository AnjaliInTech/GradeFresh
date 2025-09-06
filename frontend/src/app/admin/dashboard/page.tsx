"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Package, 
  BarChart3, 
  RefreshCw,
  Home,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  AlertCircle,
  Loader2,
  UserCheck,
  Shield,
  Truck,
  Eye,
  TrendingUp,
  PieChart
} from "lucide-react";
import Image from "next/image";
import AdminRoute from '@/app/components/Admin/AdminRoute';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("access_token") || localStorage.getItem("admin_token");
  };

  const getUserData = () => {
    const userData = localStorage.getItem("user") || localStorage.getItem("admin_user");
    try {
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        setError("Authentication required. Please sign in again.");
        setLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError(error instanceof Error ? error.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { name: "Manage Users", icon: Users, href: "/admin/users" },
    { name: "Manage News", icon: FileText, href: "/admin/news" },
    { name: "View Reports", icon: FileText, href: "/admin/reports" },
    { name: "System Settings", icon: Settings, href: "/admin/settings" },
  ];

  // Debug function to check what stats we're receiving
  const debugStats = () => {
    console.log("Current stats:", stats);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#036424] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <p className="text-gray-600 mb-6">
            {error.includes("Authentication") ? "Please sign in to access the admin dashboard" : "Failed to load dashboard data"}
          </p>
          <div className="space-y-3">
            <button
              onClick={fetchAdminStats}
              className="w-full bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2 inline" />
              Try Again
            </button>
            <button
              onClick={() => router.push("/admin/login")}
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    color, 
    loading: isLoading, 
    description,
    trend
  }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800">
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            ) : (
              value
            )}
          </p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-1 text-xs ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-3 w-3 mr-1 ${trend.value < 0 ? 'transform rotate-180' : ''}`} />
              <span>{trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Chart components
  const UserDistributionChart = () => {
    const userData = getUserDistributionData();
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
        <div className="grid grid-cols-2 gap-4">
          {userData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium text-gray-800 ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-4 bg-gray-100 rounded-full overflow-hidden">
          <div className="flex h-full">
            {userData.map((item, index) => (
              <div
                key={index}
                className="h-full"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ActivityChart = () => {
    const activityData = [
      { day: 'Mon', value: 65 },
      { day: 'Tue', value: 78 },
      { day: 'Wed', value: 90 },
      { day: 'Thu', value: 81 },
      { day: 'Fri', value: 56 },
      { day: 'Sat', value: 40 },
      { day: 'Sun', value: 30 }
    ];
    
    const maxValue = Math.max(...activityData.map(d => d.value));
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
        <div className="flex items-end justify-between h-32">
          {activityData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-8 bg-gradient-to-t from-[#036424] to-[#a3d920] rounded-t transition-all hover:opacity-80"
                style={{ height: `${(item.value / maxValue) * 80}px` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getUserDistributionData = () => {
    const totalUsers = stats?.total_users || stats?.totalUsers || 0;
    const exporterCount = stats?.exporters || stats?.exporter_count || stats?.exporterCount || 0;
    const importerCount = stats?.importers || stats?.importer_count || stats?.importerCount || 0;
    const inspectorCount = stats?.inspectors || stats?.inspector_count || stats?.inspectorCount || 0;
    const otherCount = totalUsers - (exporterCount + importerCount + inspectorCount);
    
    const data = [
      { name: 'Exporters', value: exporterCount, color: '#10B981' },
      { name: 'Importers', value: importerCount, color: '#F59E0B' },
      { name: 'Inspectors', value: inspectorCount, color: '#EF4444' },
      { name: 'Others', value: otherCount, color: '#6B7280' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return data.map(item => ({
      ...item,
      percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
    }));
  };

  const userData = getUserData();
  const welcomeName = userData?.name || "Administrator";

  // Extract user counts with fallbacks for different API response formats
  const totalUsers = stats?.total_users || stats?.totalUsers || 0;
  const exporterCount = stats?.exporters || stats?.exporter_count || stats?.exporterCount || 0;
  const importerCount = stats?.importers || stats?.importer_count || stats?.importerCount || 0;
  const inspectorCount = stats?.inspectors || stats?.inspector_count || stats?.inspectorCount || 0;

  return (
    <AdminRoute>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#feffdd] border-r border-green-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-25 px-4 py-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-40 h-16">
                  <Image
                    src="/logo.png"
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
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      item.name === "Dashboard" 
                        ? "bg-[#036424] text-white" 
                        : "text-[#02521c] hover:bg-[#036424] hover:text-white"
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="text-sm text-gray-600">Logged in as</div>
              <div className="font-medium text-gray-800">{welcomeName}</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>

            {/* Logout Button */}
            <div className="p-4 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 bg-gradient-to-l from-[#a3d920] to-[#036424] text-white hover:from-[#8ec61d] hover:to-[#02521c] rounded-lg transition-colors duration-200"
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
                  <div className="relative w-8 h-8 mr-2">
                    <Image
                      src="/logo.png"
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
                <p className="text-black">Welcome back, {welcomeName}</p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={debugStats}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Debug stats"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={fetchAdminStats}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh data"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center px-4 py-2 bg-gradient-to-l from-[#a3d920] to-[#036424] text-white rounded-lg hover:from-[#8ec61d] hover:to-[#02521c] transition-colors"
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
                value={totalUsers}
                color="bg-blue-500"
                loading={!stats}
                description="All registered users"
                trend={{ value: 12, label: "from last week" }}
              />
              <StatCard
                icon={UserCheck}
                title="Exporters"
                value={exporterCount}
                color="bg-green-500"
                loading={!stats}
                description="Fruit exporters"
                trend={{ value: 8, label: "from last week" }}
              />
              <StatCard
                icon={Truck}
                title="Importers"
                value={importerCount}
                color="bg-yellow-500"
                loading={!stats}
                description="Fruit importers"
                trend={{ value: 5, label: "from last week" }}
              />
              <StatCard
                icon={Shield}
                title="Inspectors"
                value={inspectorCount}
                color="bg-orange-500"
                loading={!stats}
                description="Quality inspectors"
                trend={{ value: 15, label: "from last week" }}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <UserDistributionChart />
              <ActivityChart />
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => router.push("/admin/users")}
                  className="flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <Users className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-blue-800 font-medium">Manage Users</span>
                  <span className="text-xs text-blue-600 mt-1">View all registered users</span>
                </button>
                <button 
                  onClick={() => router.push("/admin/news")}
                  className="flex flex-col items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <FileText className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-green-800 font-medium">Manage News</span>
                  <span className="text-xs text-green-600 mt-1">Create and edit news</span>
                </button>
                <button 
                  onClick={() => router.push("/admin/reports")}
                  className="flex flex-col items-center justify-center p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-purple-800 font-medium">View Reports</span>
                  <span className="text-xs text-purple-600 mt-1">Access system reports</span>
                </button>
                <button 
                  onClick={() => router.push("/admin/settings")}
                  className="flex flex-col items-center justify-center p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors group"
                >
                  <Settings className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-orange-800 font-medium">System Settings</span>
                  <span className="text-xs text-orange-600 mt-1">Configure system</span>
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
    </AdminRoute>
  );
};

export default AdminDashboard;