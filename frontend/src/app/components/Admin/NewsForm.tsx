'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { NewsCreate, NewsUpdate } from '@/types/news';
import { newsService } from '@/services/newsService';

interface NewsFormProps {
  editMode?: boolean;
  newsId?: string;
}

const NewsForm: React.FC<NewsFormProps> = ({ editMode = false, newsId }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (editMode && newsId) {
      fetchNewsItem();
    }
  }, [editMode, newsId]);

  const getAuthToken = () => {
    return localStorage.getItem('access_token') || localStorage.getItem('admin_token');
  };

  const fetchNewsItem = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required');
        return;
      }

      const newsItem = await newsService.getNews(newsId as string, token);
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        is_published: newsItem.is_published,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      if (editMode && newsId) {
        const updateData: NewsUpdate = {
          title: formData.title,
          content: formData.content,
          is_published: formData.is_published,
        };
        await newsService.updateNews(newsId, updateData, token);
      } else {
        const createData: NewsCreate = {
          title: formData.title,
          content: formData.content,
          is_published: formData.is_published,
        };
        await newsService.createNews(createData, token);
      }

      router.push('/admin/news');
    } catch (error) {
      console.error('Error saving news:', error);
      setError('Failed to save news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/admin/news')}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-[#02521c]">
            {editMode ? 'Edit News' : 'Create News'}
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036424] focus:border-transparent"
                placeholder="Enter news title"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#036424] focus:border-transparent"
                placeholder="Enter news content"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="h-4 w-4 text-[#036424] focus:ring-[#036424] border-gray-300 rounded"
              />
              <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                Publish immediately
              </label>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/admin/news')}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c] disabled:opacity-50 transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                {loading ? 'Saving...' : (editMode ? 'Update News' : 'Create News')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;