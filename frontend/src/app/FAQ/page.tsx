"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Leaf, Search, MessageSquare } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: "General Questions",
      icon: <MessageSquare className="w-5 h-5" />,
      questions: [
        {
          question: "What is GradeFresh?",
          answer: "GradeFresh is an AI-powered fruit quality inspection system that uses advanced computer vision and machine learning to accurately grade fruits, detect defects, and analyze ripeness for import/export businesses."
        },
        {
          question: "How does your AI technology work?",
          answer: "Our system uses deep learning algorithms trained on thousands of fruit images. It analyzes visual characteristics like color, texture, size, and surface imperfections to provide accurate quality assessments in real-time."
        },
        {
          question: "Is GradeFresh suitable for small farms?",
          answer: "Yes! We offer scalable solutions for operations of all sizes. Our basic package is designed specifically for small to medium farms looking to improve their quality control processes."
        }
      ]
    },
    {
      title: "Technical Specifications",
      icon: <Leaf className="w-5 h-5" />,
      questions: [
        {
          question: "What types of fruits can you analyze?",
          answer: "We currently support apples, oranges, bananas, strawberries, grapes, peaches, mangoes, and pears. We're continuously expanding our capabilities - contact us if you need analysis for a specific fruit not listed."
        },
        {
          question: "How accurate is your AI fruit inspection?",
          answer: "Our system achieves 99% accuracy in quality grading, 98% accuracy in defect detection, and 97% accuracy in ripeness analysis, significantly outperforming human inspection capabilities."
        },
        {
          question: "What hardware requirements are needed?",
          answer: "We provide complete hardware solutions including high-resolution cameras, lighting systems, and processing units. The basic system requires a 10x10ft space and standard electrical connections."
        },
        {
          question: "How long does the setup process take?",
          answer: "Most installations are completed within 2-3 weeks. This includes hardware installation, software configuration, calibration, and staff training. We provide full support throughout the process."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      icon: <MessageSquare className="w-5 h-5" />,
      questions: [
        {
          question: "What pricing plans do you offer?",
          answer: "We offer three main plans: Starter for small farms ($299/month), Professional for medium operations ($799/month), and Enterprise for large exporters (custom pricing). All include hardware, software, and support."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 14-day free trial of our software with sample data. For a full system trial, we provide a 30-day money-back guarantee on our Starter and Professional plans."
        },
        {
          question: "Do you offer custom solutions?",
          answer: "Absolutely. Our Enterprise solutions are fully customizable to specific fruit varieties, quality standards, production volumes, and integration requirements with existing systems."
        }
      ]
    },
    {
      title: "Support & Training",
      icon: <Leaf className="w-5 h-5" />,
      questions: [
        {
          question: "What training is provided?",
          answer: "We provide comprehensive training including system operation, maintenance, results interpretation, and troubleshooting. Training typically takes 2-3 days and is available on-site or remotely."
        },
        {
          question: "What support options are available?",
          answer: "We offer 24/7 technical support via phone, email, and chat. Response times are typically under 15 minutes for critical issues and under 4 hours for non-urgent matters."
        },
        {
          question: "Do you provide software updates?",
          answer: "Yes, all plans include regular software updates and improvements. We release major updates quarterly and minor updates monthly to ensure optimal performance and new features."
        }
      ]
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter questions based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#036424] to-[#a3d921] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-[#036424] to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 ">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{fontFamily: 'var(--font-poppins)'}}>
              Frequently Asked <span className="text-[#e0f5a1]">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8" style={{fontFamily: 'var(--font-poppins)'}}>
              Find answers to common questions about our AI fruit inspection technology and services.
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
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#036424] focus:border-transparent transition-all"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-3">
              Found {filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} results for "{searchTerm}"
            </p>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">Try different search terms or browse all categories</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#036424] to-[#a3d921] p-6 text-white">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        {category.icon}
                      </div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {category.questions.map((item, questionIndex) => {
                        const index = categoryIndex * 10 + questionIndex;
                        return (
                          <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                            <button
                              onClick={() => toggleQuestion(index)}
                              className="flex justify-between items-center w-full text-left font-semibold text-gray-800 hover:text-[#036424] transition-colors py-3"
                            >
                              <span>{item.question}</span>
                              {activeIndex === index ? (
                                <ChevronUp className="w-5 h-5 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 flex-shrink-0" />
                              )}
                            </button>
                            {activeIndex === index && (
                              <div className="pl-2 mt-2 text-gray-600">
                                <div className="border-l-2 border-[#a3d920] pl-4 py-2">
                                  {item.answer}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-[#e0f5a1] to-[#a3d921]/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-[#036424] mb-4" style={{fontFamily: 'var(--font-poppins)'}}>
              Still have questions?
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Can't find the answer you're looking for? Our team is here to help you with any questions about our AI fruit inspection technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contactus">
              <button className="bg-[#036424] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#02521c] transition-colors">
                Contact Support
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;