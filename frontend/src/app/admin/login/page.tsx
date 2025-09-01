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
  const [error, setError] = useState("");
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
      // For now, use hardcoded admin credentials
      // Later, replace with API call to your backend
      if (formData.email === "admin@gradefresh.com" && formData.password === "adminpassword") {
        // Store admin authentication
        localStorage.setItem("admin_token", "admin_demo_token");
        localStorage.setItem("admin_user", JSON.stringify({
          id: "admin_1",
          name: "Admin User",
          email: "admin@gradefresh.com",
          role: "admin"
        }));
        
        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
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
              {error}
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black"
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

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Demo Credentials:</h3>
            <p className="text-xs text-yellow-700">
              Email: <strong>admin@gradefresh.com</strong>
              <br />
              Password: <strong>adminpassword</strong>
            </p>
          </div>

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