"use client";

import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, XCircle, ImageIcon, ArrowRight, Star } from 'lucide-react';
import Footer from '../components/footer';
import Header from '../components/header';
import Image from "next/image";

const FruitQualityChecker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <Header />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#036424] mb-4">
              Fruit Quality Checker
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Snap, upload, and discover the story behind your fruit! Our intelligent system analyzes your image to uncover freshness, ripeness, and even whether it's fit for export. From farm to market, get detailed insights in seconds—so you'll always know if your fruit is ready to eat, sell, or ship worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div
                className={`border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-[#036424] hover:bg-gray-50 ${
                  selectedImage ? 'border-green-400 bg-green-50' : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected fruit"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="py-12">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                )}
              </div>

              {selectedImage && (
                <button
                  className="w-full bg-gradient-to-r from-[#036424] to-[#a3d920] text-white py-4 rounded-xl font-semibold mt-6 hover:from-[#02521c] hover:to-[#8ec61d] transition-all duration-300"
                >
                  Analyze Quality
                </button>
              )}
            </div>

            {/* Right Side - Results Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quality Analysis</h3>
              
              {selectedImage ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Click "Analyze Quality" to see results</p>
                  <p className="text-sm text-gray-500 mt-2">
                    This will connect to our AI quality analysis system
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Upload a fruit image to see quality analysis</p>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Instant Analysis</h4>
              <p className="text-gray-600">Get real-time quality assessment in seconds</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">AI-Powered</h4>
              <p className="text-gray-600">Advanced machine learning algorithms</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Easy Upload</h4>
              <p className="text-gray-600">Drag & drop or click to upload images</p>
            </div>
          </div>

          {/* How it works */}
<div className="mt-16 text-center">
  <h3 className="text-3xl font-bold text-[#036424] mb-8">How It Works</h3>
  <div className="grid md:grid-cols-4 gap-6">
    {/* Step 1 */}
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#036424]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">Upload Image</h4>
      <p className="text-gray-600">Select a clear photo of your fruit</p>
    </div>
    
    {/* Step 2 */}
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#036424]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">AI Analysis</h4>
      <p className="text-gray-600">Our system processes the image</p>
    </div>
    
    {/* Step 3 */}
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#036424]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">Get Results</h4>
      <p className="text-gray-600">Receive detailed quality report</p>
    </div>
    
    {/* Step 4 */}
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#036424]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">Take Action</h4>
      <p className="text-gray-600">Make informed decisions</p>
    </div>
  </div>
</div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FruitQualityChecker;