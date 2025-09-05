"use client";

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react'

interface AdminRouteProps {
  children: React.ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = () => {
      // Check for both possible token locations
      const accessToken = localStorage.getItem("access_token");
      const adminToken = localStorage.getItem("admin_token");
      const userData = localStorage.getItem("user");
      const adminUser = localStorage.getItem("admin_user");

      console.log("AdminRoute - Access Token:", accessToken);
      console.log("AdminRoute - Admin Token:", adminToken);
      console.log("AdminRoute - User Data:", userData);
      console.log("AdminRoute - Admin User:", adminUser);

      const token = accessToken || adminToken;
      const user = userData || adminUser;

      if (!token || !user) {
        console.log("AdminRoute - No token or user data, redirecting to admin login");
        router.push("/admin/login");
        return;
      }

      try {
        const userObj = JSON.parse(user);
        console.log("AdminRoute - User role:", userObj.role);
        
        if (userObj.role !== "admin") {
          console.log("AdminRoute - User is not admin, redirecting to home");
          router.push("/");
          return;
        }
        
        // If we have admin_token but not access_token, sync them
        if (adminToken && !accessToken) {
          localStorage.setItem("access_token", adminToken);
        }
        if (adminUser && !userData) {
          localStorage.setItem("user", adminUser);
        }
        
        setIsAuthorized(true);
      } catch (error) {
        console.error("AdminRoute - Error parsing user data:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#036424] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <div className="text-red-500 text-xl mb-4">Access Denied</div>
          <p className="text-gray-600 mb-6">You need administrator privileges to access this page.</p>
          <button
            onClick={() => router.push("/admin/login")}
            className="bg-[#036424] text-white px-6 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}