import React from 'react'
import Header from '@/app/components/header'
import Footer from './components/footer'
import NewsCarousel from './components/news'
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <Header/>
      
      {/* New Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">

          {/* 📝 Left Side - Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-[52px]  text-[#000] leading-tight " style={{fontFamily: 'var(--font-poppins)'}}>
              <span style={{ color: '#096529' }}>Grade Fresh</span> <br></br> Perfecting fruit quality for global trade.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700 "style={{fontFamily: 'var(--font-poppins)'}}>
              AI-powered fruit inspection system for import/export businesses.
            </p>
            <div className="mt-8">
              <Link href="/quality">
              <button className="bg-gradient-to-t from-[#a3d920] to-[#036424] text-white px-10 py-4 rounded-full text-sm uppercase tracking-wide hover:from-[#036424] hover:to-[#a3d920] transition duration-300 font-poppins">
                Get Started
              </button>
              </Link>
            </div>
          </div>

          {/* 🎥 Right Side - Video */}
          <div className="flex-2 w-full pr-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[500px] md:h-[600px] lg:h-[550px] object-cover"
            >
              <source src="/Hero_Clairfresh05-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </section>
      
      {/* About Us Section */}
      <section className="py-16 bg-gradient-to-b from-[white] to-[#e0f5a1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl  text-[#036424] mb-4" style={{fontFamily: 'var(--font-poppins)'}}>
              About Grade Fresh
            </h2>
            <div className="w-24 h-1 bg-[#a3d920] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/image2.jpg" 
                  alt="Fruit quality inspection" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#036424]">99%</div>
                  <div className="text-sm text-gray-600 mt-1">Accuracy Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6" style={{fontFamily: 'var(--font-poppins)'}}>
                Revolutionizing Fruit Quality Inspection with AI
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed" style={{fontFamily: 'var(--font-poppins)'}}>
                Grade Fresh transforms how the global fruit trade ensures <br></br>quality through advanced AI-powered inspection systems.<br></br> 
                Our technology delivers unprecedented accuracy in grading fruits, reducing waste, and increasing profitability 
                for<br></br> import/export businesses worldwide.
              </p>
              
              <Link href="/aboutus">
                 <button className="bg-gradient-to-r from-[#036424] to-[#a3d921] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                         Read More
                  </button>
                 </Link>
            </div>
          </div>
        </div>
      </section>
      
{/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#036424] mb-4" style={{fontFamily: 'var(--font-poppins)'}}>
              Advanced AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'var(--font-poppins)'}}>
              Our cutting-edge technology delivers comprehensive fruit inspection capabilities
            </p>
            <div className="w-24 h-1 bg-[#a3d920] mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-[#f0f8e0] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e0f5a1]">
              <div className="w-14 h-14 bg-[#036424] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3" style={{fontFamily: 'var(--font-poppins)'}}>Quality Grading</h3>
              <p className="text-gray-600" style={{fontFamily: 'var(--font-poppins)'}}>
                Automatically classify fruits by quality standards with 99% accuracy, ensuring consistent grading across all batches.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-[#f0f8e0] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e0f5a1]">
              <div className="w-14 h-14 bg-[#036424] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3" style={{fontFamily: 'var(--font-poppins)'}}>Defect Detection</h3>
              <p className="text-gray-600" style={{fontFamily: 'var(--font-poppins)'}}>
                Identify bruises, spots, and other imperfections that are invisible to the human eye, reducing waste and improving quality.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-[#f0f8e0] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e0f5a1]">
              <div className="w-14 h-14 bg-[#036424] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3" style={{fontFamily: 'var(--font-poppins)'}}>Ripeness Analysis</h3>
              <p className="text-gray-600" style={{fontFamily: 'var(--font-poppins)'}}>
                Precisely determine the ripeness stage of each fruit to optimize harvest timing and extend shelf life.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-white to-[#f0f8e0] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e0f5a1]">
              <div className="w-14 h-14 bg-[#036424] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3" style={{fontFamily: 'var(--font-poppins)'}}>Size & Weight Estimation</h3>
              <p className="text-gray-600" style={{fontFamily: 'var(--font-poppins)'}}>
                Accurately measure physical attributes without contact, enabling precise sorting and packaging.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-white to-[#f0f8e0] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e0f5a1]">
              <div className="w-14 h-14 bg-[#036424] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3" style={{fontFamily: 'var(--font-poppins)'}}>Real-time Processing</h3>
              <p className="text-gray-600" style={{fontFamily: 'var(--font-poppins)'}}>
                Analyze up to 100 fruits per second on production lines with minimal latency for maximum efficiency.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-white to-[#f0f8e0] rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e0f5a1]">
              <div className="w-14 h-14 bg-[#036424] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3" style={{fontFamily: 'var(--font-poppins)'}}>Customizable Standards</h3>
              <p className="text-gray-600" style={{fontFamily: 'var(--font-poppins)'}}>
                Adapt to regional quality standards and specific customer requirements with easily configurable parameters.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Alternative News Section with Card Previews */}
<section className="py-16 bg-gradient-to-b from-[white] to-[#e0f5a1]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl text-[#036424] mb-4" style={{fontFamily: 'var(--font-poppins)'}}>
        Latest News & Updates
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'var(--font-poppins)'}}>
        Stay updated with the latest in fruit inspection technology and industry insights
      </p>
      <div className="w-24 h-1 bg-[#a3d920] mx-auto mt-4"></div>
    </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start ">
            
            
            {/* Right Column - Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6" style={{fontFamily: 'var(--font-poppins)'}}>
                Revolutionizing Fruit Quality Inspection with AI
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed" style={{fontFamily: 'var(--font-poppins)'}}>
                Grade Fresh transforms how the global fruit trade ensures <br></br>quality through advanced AI-powered inspection systems.<br></br> 
                Our technology delivers unprecedented accuracy in grading fruits, reducing waste, and increasing profitability 
                for<br></br> import/export businesses worldwide.
              </p>
              
              <Link href="/news">
                 <button className="bg-gradient-to-r from-[#036424] to-[#a3d921] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                         Read More
                  </button>
                 </Link>
            </div>
            {/* Left Column - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/QC-Header.webp" 
                  alt="Fruit quality inspection" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
  </div>
</section>

      
      <Footer/>
    </div>
  )
}

export default page