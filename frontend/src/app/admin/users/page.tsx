"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  UserX,
  UserCheck,
  RefreshCw,
  Home,
  Settings,
  FileText,
  LogOut,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import AdminRoute from '@/app/components/Admin/AdminRoute';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  username: string;
  created_at: string;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
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

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No access token found");
        setError("Authentication required. Please sign in again.");
        setLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (response.status === 403) {
        setError("Admin access required. You don't have permission to view users.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch users:", response.status, errorText);
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const usersData = await response.json();
      console.log("Users data received:", usersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error instanceof Error ? error.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setDeletingId(userId);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      if (!token) {
        handleUnauthorized();
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to delete user: ${response.status}`);
      }

      setSuccess("User deleted successfully");
      setUsers(users.filter(user => user.id !== userId));
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setDeletingId(null);
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
    { name: "View Reports", icon: FileText, href: "/admin/reports" },
    { name: "System Settings", icon: Settings, href: "/admin/settings" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "Unknown date";
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'exporter': return 'bg-blue-100 text-blue-800';
      case 'importer': return 'bg-green-100 text-green-800';
      case 'inspector': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'exporter': return <UserCheck className="h-4 w-4 text-blue-600" />;
      case 'importer': return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'inspector': return <UserCheck className="h-4 w-4 text-orange-600" />;
      default: return <UserCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#036424] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  const userData = getUserData();
  const welcomeName = userData?.name || "Administrator";

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
                      item.name === "Manage Users" 
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
                <h1 className="text-2xl font-bold text-[#02521c]">MANAGE USERS</h1>
                <p className="text-black">User management dashboard</p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={fetchUsers}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh users"
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
            {/* Alerts */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  {success}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036424] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036424] focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="exporter">Exporters</option>
                  <option value="importer">Importers</option>
                  <option value="inspector">Inspectors</option>
                </select>

                <button
                  onClick={fetchUsers}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-[#036424] text-white rounded-lg hover:bg-[#02521c] transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <div className="flex flex-col items-center text-gray-500">
                            <UserX className="h-12 w-12 mb-4 text-gray-400" />
                            <p className="text-lg font-medium mb-2">No users found</p>
                            <p className="text-sm">
                              {searchTerm || selectedRole !== "all" 
                                ? "Try adjusting your search or filters" 
                                : "No users have been registered yet"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#036424] to-[#a3d920] rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{user.name || 'Unknown'}</div>
                                <div className="text-sm text-gray-500">@{user.username || 'unknown'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {getRoleIcon(user.role)}
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                {user.role || 'unknown'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{user.email || 'No email'}</div>
                            <div className="text-sm text-gray-500">{user.phone || 'No phone'}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(user.created_at)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {/* View user details */}}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View user details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {/* Edit user */}}
                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit user"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                disabled={deletingId === user.id}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete user"
                              >
                                {deletingId === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Filter className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Filtered</p>
                    <p className="text-2xl font-bold text-gray-800">{filteredUsers.length}</p>
                  </div>
                </div>
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

export default ManageUsers;