"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data for the carousel
const newsItems = [
  {
    id: 1,
    title: "New AI Detection Technology",
    description: "We've launched our latest AI-powered fruit grading system with 99.7% accuracy in detecting imperfections.",
    image: "/api/placeholder/400/250?text=AI+Tech",
    date: "May 15, 2023"
  },
  {
    id: 2,
    title: "Sustainable Farming Partnership",
    description: "GradeFresh partners with organic farms in California to promote sustainable farming practices.",
    image: "/api/placeholder/400/250?text=Sustainable+Farming",
    date: "April 22, 2023"
  },
  {
    id: 3,
    title: "Industry Recognition Award",
    description: "Our technology received the Innovation Award at the Global Agriculture Technology Summit.",
    image: "/api/placeholder/400/250?text=Industry+Award",
    date: "March 10, 2023"
  },
  {
    id: 4,
    title: "Seasonal Fruit Availability",
    description: "Check out our new seasonal fruit catalog featuring exotic varieties from around the world.",
    image: "/api/placeholder/400/250?text=Seasonal+Fruits",
    date: "February 28, 2023"
  }
];

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">News & Updates</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Stay updated with the latest developments at GradeFresh and the fruit industry
        </p>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel container */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="bg-white flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <span className="text-sm text-[#036424] font-medium mb-2">{item.date}</span>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <button className="self-start text-[#036424] font-medium hover:text-[#a3d921] transition-colors">
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#036424]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;