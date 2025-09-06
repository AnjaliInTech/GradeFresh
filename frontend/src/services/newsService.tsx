import { News, NewsCreate, NewsUpdate } from '@/types/news';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const newsService = {
  // Get all news (admin only)
  getAllNews: async (token: string): Promise<News[]> => {
    const response = await fetch(`${API_URL}/api/admin/news`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    return response.json();
  },

  // Get single news item (admin only)
  getNews: async (id: string, token: string): Promise<News> => {
    const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news item');
    }

    return response.json();
  },

  // Create news (admin only)
  createNews: async (newsData: NewsCreate, token: string): Promise<News> => {
    const response = await fetch(`${API_URL}/api/admin/news`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsData),
    });

    if (!response.ok) {
      throw new Error('Failed to create news');
    }

    return response.json();
  },

  // Update news (admin only)
  updateNews: async (id: string, newsData: NewsUpdate, token: string): Promise<News> => {
    const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsData),
    });

    if (!response.ok) {
      throw new Error('Failed to update news');
    }

    return response.json();
  },

  // Delete news (admin only)
  deleteNews: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete news');
    }
  },

  // Get published news (public)
  getPublicNews: async (): Promise<News[]> => {
    const response = await fetch(`${API_URL}/api/news`);

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    return response.json();
  },
};