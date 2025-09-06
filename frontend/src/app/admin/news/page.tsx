'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import AdminRoute from '@/app/components/Admin/AdminRoute';
import { News } from '@/types/news';
import { newsService } from '@/services/newsService';

const ManageNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('access_token') || localStorage.getItem('admin_token');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
      <div className="min-h-screen bg-gray-50 p-6">
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
      </div>
    </AdminRoute>
  );
};

export default ManageNews;