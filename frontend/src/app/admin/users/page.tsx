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
  RefreshCw
} from "lucide-react";
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
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access_token");
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
      const token = localStorage.getItem("access_token");
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
      // Remove the user from the local state
      setUsers(users.filter(user => user.id !== userId));
      
      // Clear success message after 3 seconds
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
    localStorage.removeItem("user");
    router.push("/signin");
  };

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

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => router.push("/admin/dashboard")}
                  className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-[#02521c]">Manage Users</h1>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">
                  {users.length} user{users.length !== 1 ? 's' : ''} total
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
      </div>
    </AdminRoute>
  );
};

export default ManageUsers;