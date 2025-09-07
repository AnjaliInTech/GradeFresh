"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield, LogIn } from "lucide-react";
import Link from "next/link";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError("");

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    // DEBUG: Log what we're sending
    console.log("Sending login request to:", `${API_URL}/api/admin/login`);
    console.log("Email:", formData.email);
    
    const formDataParams = new URLSearchParams();
    formDataParams.append('email', formData.email);  // FIXED: Use 'email' not 'username'
    formDataParams.append('password', formData.password);

const response = await fetch(`${API_URL}/api/admin/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: formDataParams,
});

    // DEBUG: Log response status
    console.log("Response status:", response.status);
    
    const data = await response.json();
    console.log("Response data:", data);  // DEBUG: Log response data

    if (response.ok) {
      // Store authentication data
      localStorage.setItem("admin_token", data.access_token);
      localStorage.setItem("admin_user", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      }));
      
      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } else {
      // Handle different error formats
      if (data.detail) {
        setError(data.detail);
      } else {
        setError(data.message || "Invalid credentials");
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    setError("Login failed. Please check your connection and try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#036424]">
        {/* Header */}
        <div className="bg-[#036424] p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-green-100 mt-1">GradeFresh Administration</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#036424] rounded-lg focus:ring-2 focus:ring-[#036424] focus:border-transparent transition-all text-black"
                placeholder="admin@gradefresh.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#036424] rounded-lg focus:ring-2 focus:ring-[#036424] focus:border-transparent transition-all pr-12 text-black"
                  placeholder="Enter your password"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#036424] to-[#a3d921] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center ${
                isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:from-[#02521c] hover:to-[#8ec61d]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in as Admin
                </>
              )}
            </button>
          </form>

          {/* Back to main site */}
          <div className="mt-6 text-center">
            <Link 
              href="/"
              className="text-sm text-[#036424] hover:text-[#02521c] hover:underline"
            >
              ← Back to main website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;