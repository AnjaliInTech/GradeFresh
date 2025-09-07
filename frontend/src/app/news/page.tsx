'use client';

import React, { useState, useEffect } from 'react';
import { News } from '@/types/news';
import { newsService } from '@/services/newsService';
import Footer from '../components/footer';
import Header from '../components/header';
import { Calendar, User, Search, Clock } from 'lucide-react';
import Link from 'next/link';

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState<News[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
  }, [searchTerm, news]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const newsData = await newsService.getPublicNews();
      setNews(newsData);
      setFilteredNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#036424] mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchNews}
            className="mt-4 bg-[#036424] text-white px-6 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#036424] to-[#a3d921] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-[#036424] to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{fontFamily: 'var(--font-poppins)'}}>
              Latest <span className="text-[#e0f5a1]">News</span> & Updates
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8" style={{fontFamily: 'var(--font-poppins)'}}>
              Stay informed with the latest developments in AI fruit inspection technology and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#036424] focus:border-transparent transition-all"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-3">
              Found {filteredNews.length} results for "{searchTerm}"
            </p>
          )}
        </div>
      </section>

      {/* News Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No news found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? `No results for "${searchTerm}"` : 'No news articles available at the moment'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-[#036424] text-white px-6 py-2 rounded-lg hover:bg-[#02521c] transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((newsItem) => (
                <article key={newsItem._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 bg-gradient-to-br from-[#036424] to-[#a3d921] overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        newsItem.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {newsItem.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl font-bold text-white">
                        {newsItem.title}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-600 whitespace-pre-line">
                        {newsItem.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{newsItem.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(newsItem.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatTimeAgo(newsItem.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

 {/* Newsletter Section */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-gradient-to-br from-[#e0f5a1] to-[#a3d921]/30 rounded-2xl p-8 md:p-12 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image on the left */}
        <div className="md:w-2/5 mb-8 md:mb-0 md:mr-8">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
            <img
              src="./image1.webp" // Replace with your actual image path
              alt="Fruit Quality Inspection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 "></div>
          </div>
        </div>

        {/* Content on the right */}
        <div className="md:w-3/5 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#036424] mb-4" style={{fontFamily: 'var(--font-poppins)'}}>
            Check Fruit Quality Instantly
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Upload an image of your fruits and let our AI technology analyze the quality, ripeness, and detect any defects in seconds.
          </p>
          
          {/* Get Started Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/quality">
            <button className="bg-gradient-to-r from-[#036424] to-[#a3d921] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Get Started Now
            </button>
            </Link>
          </div>

          
        </div>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default NewsPage;