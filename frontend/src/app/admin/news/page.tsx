'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowLeft,
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
  UserCheck,
  Shield,
  Truck
} from 'lucide-react';
import Image from 'next/image';
import AdminRoute from '@/app/components/Admin/AdminRoute';
import { News } from '@/types/news';
import { newsService } from '@/services/newsService';

const ManageNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('access_token') || localStorage.getItem('admin_token');
  };

  const getUserData = () => {
    const userData = localStorage.getItem('user') || localStorage.getItem('admin_user');
    try {
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const newsData = await newsService.getAllNews(token);
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required');
        return;
      }

      await newsService.deleteNews(id, token);
      setNews(news.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
      setError('Failed to delete news');
    }
  };

  const togglePublishStatus = async (newsItem: News) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required');
        return;
      }

      const updatedNews = await newsService.updateNews(
        newsItem._id, 
        { is_published: !newsItem.is_published }, 
        token
      );
      
      setNews(news.map(item => 
        item._id === newsItem._id ? updatedNews : item
      ));
    } catch (error) {
      console.error('Error updating news:', error);
      setError('Failed to update news');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const navigationItems = [
    { name: 'Dashboard', icon: Home, href: '/admin/dashboard' },
    { name: 'Manage Users', icon: Users, href: '/admin/users' },
    { name: 'Manage News', icon: FileText, href: '/admin/news' },
    { name: 'View Reports', icon: FileText, href: '/admin/reports' },
    { name: 'System Settings', icon: Settings, href: '/admin/settings' },
  ];

  const userData = getUserData();
  const welcomeName = userData?.name || 'Administrator';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#036424] mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading news...</p>
        </div>
      </div>
    );
  }

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
                      item.name === 'Manage News' 
                        ? 'bg-[#036424] text-white' 
                        : 'text-[#02521c] hover:bg-[#036424] hover:text-white'
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
                <h1 className="text-2xl font-bold text-[#02521c]">MANAGE NEWS</h1>
                <p className="text-black">Welcome back, {welcomeName}</p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={fetchNews}
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
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <button
                    onClick={() => router.push('/admin/dashboard')}
                    className="mr-4 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <h1 className="text-3xl font-bold text-[#02521c]">Manage News</h1>
                </div>
                <button
                  onClick={() => router.push('/admin/news/create')}
                  className="flex items-center bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add News
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* News List */}
              {news.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <p className="text-gray-500 text-lg">No news articles found.</p>
                  <button
                    onClick={() => router.push('/admin/news/create')}
                    className="mt-4 bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
                  >
                    Create Your First News Article
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {news.map((newsItem) => (
                    <div key={newsItem._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-800 mr-3">{newsItem.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              newsItem.is_published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {newsItem.is_published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2">{newsItem.content}</p>
                          <div className="text-sm text-gray-500">
                            <span>By {newsItem.author} • {formatDate(newsItem.created_at)}</span>
                            {newsItem.updated_at !== newsItem.created_at && (
                              <span> • Updated {formatDate(newsItem.updated_at)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => togglePublishStatus(newsItem)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title={newsItem.is_published ? 'Unpublish' : 'Publish'}
                          >
                            {newsItem.is_published ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => router.push(`/admin/news/edit/${newsItem._id}`)}
                            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(newsItem._id)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

export default ManageNews;