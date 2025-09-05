"use client";

import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, XCircle, ImageIcon, ArrowRight, Star, Loader2, AlertCircle, Download, Camera, Sparkles } from 'lucide-react';
import Footer from '../components/footer';
import Header from '../components/header';
import jsPDF from 'jspdf';
import ProtectedRoute from '../components/ProtectedRoute';

const FruitQualityChecker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeQuality = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('access_token');
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          window.location.href = '/signin';
          return;
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current || !selectedImage || !analysisResult) return;
    
    setIsGeneratingPDF(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;
      
      pdf.setFontSize(20);
      pdf.setTextColor(3, 100, 36);
      pdf.text('Fruit Quality Analysis Report', pdfWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Report Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 15;
      
      const imgWidth = pdfWidth - 2 * margin;
      const imgHeight = imgWidth * 0.75;
      pdf.addImage(selectedImage, 'JPEG', margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 15;
      
      pdf.setFontSize(16);
      pdf.setTextColor(3, 100, 36);
      pdf.text('Quality Assessment', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Status: ${analysisResult.prediction.quality_status}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Confidence: ${(analysisResult.prediction.confidence * 100).toFixed(1)}%`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Class: ${analysisResult.prediction.class.replace(/_/g, ' ')}`, margin, yPosition);
      yPosition += 15;
      
      const description = analysisResult.prediction.description;
      const splitDescription = pdf.splitTextToSize(description, pdfWidth - 2 * margin);
      pdf.text('Description:', margin, yPosition);
      yPosition += 8;
      pdf.text(splitDescription, margin, yPosition);
      yPosition += splitDescription.length * 5 + 10;
      
      pdf.text(`Export Suitable: ${analysisResult.prediction.export_suitable ? 'Yes' : 'No'}`, margin, yPosition);
      
      pdf.save(`fruit-quality-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF report');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getQualityIcon = (qualityCode: string) => {
    switch (qualityCode) {
      case 'excellent':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-12 h-12 text-blue-500" />;
      case 'poor':
        return <XCircle className="w-12 h-12 text-red-500" />;
      default:
        return <AlertCircle className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getQualityColor = (qualityCode: string) => {
    switch (qualityCode) {
      case 'excellent':
        return 'text-green-700 bg-green-100';
      case 'good':
        return 'text-blue-700 bg-blue-100';
      case 'poor':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-yellow-700 bg-yellow-100';
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-[#036424] to-[#a3d921] text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-[#036424] to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Text Content */}
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{fontFamily: 'var(--font-poppins)'}}>
                  Fruit Quality <span className="text-[#e0f5a1]">Checker</span>
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-8" style={{fontFamily: 'var(--font-poppins)'}}>
                  Snap, upload, and discover the story behind your fruit! Our intelligent system analyzes your image to uncover freshness, ripeness, and even whether it's fit for export.
                </p>
              </div>
              
              {/* Image Container */}
              <div className="lg:w-5/5">
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/image1.webp" 
                      alt="AI fruit quality inspection" 
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              
              {/* Left Side - Creative Image Upload */}
              <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#a3d920]/20 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#036424]/20 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#036424] to-[#a3d920] rounded-full mb-4">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Upload Your Fruit Image</h3>
                    <p className="text-gray-600 mt-2">Let our AI work its magic</p>
                  </div>

                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-500 ${
                      isDragging 
                        ? 'border-[#036424] bg-[#e0f5a1]/20 scale-105 shadow-inner' 
                        : selectedImage 
                          ? 'border-green-400 bg-green-50' 
                          : 'border-gray-300 hover:border-[#036424] hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
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
                        <div className="absolute -top-3 -right-3">
                          <div className="w-6 h-6 bg-[#036424] rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <img
                          src={selectedImage}
                          alt="Selected fruit"
                          className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-12 transition-all duration-300">
                        <div className="relative mb-6">
                          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                            <ImageIcon className="w-10 h-10 text-gray-400" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#a3d920] rounded-full flex items-center justify-center animate-pulse">
                            <PlusIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-gray-600 font-medium">
                            {isDragging ? 'Drop your image here' : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-sm text-gray-500">
                            PNG, JPG, JPEG (Max 10MB)
                          </p>
                        </div>
                        
                        {isDragging && (
                          <div className="absolute inset-0 bg-[#036424]/10 rounded-2xl flex items-center justify-center">
                            <div className="bg-white rounded-lg p-4 shadow-lg">
                              <Upload className="w-8 h-8 text-[#036424] mx-auto mb-2" />
                              <p className="text-sm text-[#036424] font-medium">Drop to analyze</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {selectedImage && (
                    <button
                      onClick={analyzeQuality}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-[#036424] to-[#a3d920] text-white py-4 rounded-xl font-semibold mt-6 hover:from-[#02521c] hover:to-[#8ec61d] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden group shadow-lg"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#02521c] to-[#8ec61d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center">
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Analyze Quality
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side - Results */}
              <div className="bg-white rounded-2xl shadow-lg p-8" ref={reportRef}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Quality Analysis</h3>
                  {analysisResult && (
                    <button
                      onClick={downloadPDF}
                      disabled={isGeneratingPDF}
                      className="flex items-center bg-[#036424] text-white px-4 py-2 rounded-lg hover:bg-[#02521c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPDF ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                    </button>
                  )}
                </div>
                
                {isAnalyzing ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-[#036424] animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Analyzing your fruit image...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Error analyzing image</p>
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                    <button 
                      onClick={analyzeQuality}
                      className="mt-4 text-[#036424] hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : analysisResult ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      {getQualityIcon(analysisResult.prediction.quality_code)}
                      <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full ${getQualityColor(analysisResult.prediction.quality_code)}`}>
                        <span className="font-semibold">{analysisResult.prediction.quality_status}</span>
                      </div>
                      <p className="mt-2 text-gray-600">Confidence: {(analysisResult.prediction.confidence * 100).toFixed(1)}%</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Analysis Details</h4>
                      <p className="text-gray-600">{analysisResult.prediction.description}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Export Suitability</h4>
                      <div className="flex items-center">
                        {analysisResult.prediction.export_suitable ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-green-700">Suitable for export/import</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-500 mr-2" />
                            <span className="text-red-700">Not suitable for export/import</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Detected Class</h4>
                      <p className="text-gray-600 capitalize">{analysisResult.prediction.class.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                ) : selectedImage ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Click "Analyze Quality" to see results</p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Upload a fruit image to see quality analysis</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

// Plus icon component
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default FruitQualityChecker;