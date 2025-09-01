"use client";

import React, { useState } from "react";
import Header from "@/app/components/header";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Phone, Lock, ChevronDown } from "lucide-react";
import Footer from "../components/footer";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", formData);
      setIsSubmitting(false);
      // Add success notification/redirect here later
    }, 1500);
  };

  return (
    <div className="relative min-h-screen  bg-white">
      {/* Header */}
      <Header />

      {/* Fruit Pattern Background */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#036424] rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#a3d921] rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#036424] rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Register Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-lg bg-[#e0f5a1] backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-[#a3d921]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#036526] mb-2">CREATE ACCOUNT</h2>
            <p className="text-gray-800">Join our fruity community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#036424] rounded-xl focus:ring-2 focus:ring-[#a3d921] focus:border-transparent transition-all text-black"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#036424] rounded-xl focus:ring-2 focus:ring-[#a3d921] focus:border-transparent transition-all text-black"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3  bg-white border border-[#036424] rounded-xl focus:ring-2 focus:ring-[#a3d921] focus:border-transparent transition-all text-black"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 bg-white border border-[#036424] rounded-xl focus:ring-2 focus:ring-[#a3d921] focus:border-transparent appearance-none transition-all text-black"
                required
              >
                <option value="">Select Role</option>
                <option value="exporters">Exporters</option>
                <option value="importers">Importers</option>
                <option value="inspectors">Inspectors</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#036424] rounded-xl focus:ring-2 focus:ring-[#a3d921] focus:border-transparent transition-all text-black"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 bg-white border border-[#036424] rounded-xl focus:ring-2 focus:ring-[#a3d921] focus:border-transparent transition-all text-black"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#a3d921] to-[#036424] text-black py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center ${
                isSubmitting ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-500 w-full"></div>
            <span className="bg-white px-3 text-sm text-gray-800">Or continue with</span>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-black">Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-800">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#036424] font-medium hover:underline transition-all">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default RegisterPage;