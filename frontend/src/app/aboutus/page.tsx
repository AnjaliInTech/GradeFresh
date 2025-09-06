import React from 'react';
import Header from '@/app/components/header';
import Footer from '../components/footer';
import Link from 'next/link';


const About = () => {
  return (
    <div className="min-h-screen">
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
          Transforming Fruit Quality <span className="text-[#e0f5a1]">With AI</span>
        </h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8" style={{fontFamily: 'var(--font-poppins)'}}>
          At GradeFresh, we're revolutionizing how the world inspects, grades, and values fresh produce through cutting-edge artificial intelligence.
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

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl text-[#036424] mb-6" style={{fontFamily: 'var(--font-poppins)'}}>
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-[#a3d920] mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 leading-relaxed" style={{fontFamily: 'var(--font-poppins)'}}>
              To reduce global food waste and increase profitability for fruit producers and distributors through 
              accurate, AI-powered quality inspection that sets new standards for the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#f0f8e0] to-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#036424] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 极9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3">Accuracy</h3>
              <p className="text-gray-600">99% accurate fruit grading with our advanced AI algorithms</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#f0f8e0] to-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#036424] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3">Efficiency</h3>
              <p className="text-gray-600">Process hundreds of fruits per minute with real-time analysis</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#f0f8e0] to-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#036424] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 极0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#036424] mb-3">Sustainability</h3>
              <p className="text-gray-600">Reduce food waste by up to 30% with precise quality assessment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#e0f5a1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#036424] mb-6" style={{fontFamily: 'var(--font-poppins)'}}>
                Our Story
              </h2>
              <div className="w-24 h-1 bg-[#a3d920] mb-8"></div>
              <p className="text-gray-700 mb-6 text-lg" style={{fontFamily: 'var(--font-poppins)'}}>
                GradeFresh was founded in 2020 by a team of AI experts and agricultural engineers who recognized a critical need for 
                more accurate and efficient fruit quality inspection in the global supply chain.
              </p>
              <p className="text-gray-700 mb-6 text-lg" style={{fontFamily: 'var(--font-poppins)'}}>
                After witnessing the significant food waste caused by inconsistent manual grading and the financial losses experienced by 
                farmers and distributors, we set out to develop a solution that would leverage cutting-edge technology to bring objectivity 
                and precision to fruit quality assessment.
              </p>
              <p className="text-gray-700 mb-8 text-lg" style={{fontFamily: 'var(--font-poppins)'}}>
                Today, our AI-powered systems are used by major fruit producers and exporters across 15 countries, helping them increase 
                profitability while reducing their environmental impact.
              </p>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/image3.png" 
                  alt="GradeFresh team working" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#036424]">15+</div>
                  <div className="text-sm text-gray-600 mt-1">Countries Using Our Technology</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#036424] to-[#a3d921] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm uppercase tracking-wider">Farms Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30%</div>
              <div className="text-sm uppercase tracking-wider">Waste Reduction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-sm uppercase tracking-wider">Fruits Analyzed Daily</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-sm uppercase tracking-wider">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl text-[#036424] mb-6" style={{fontFamily: 'var(--font-poppins)'}}>
            Ready to Transform Your Fruit Quality Process?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto" style={{fontFamily: 'var(--font-poppins)'}}>
            Join hundreds of fruit producers and distributors who are already benefiting from our AI-powered inspection technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/quality">
            <button className="bg-gradient-to-r from-[#036424] to-[#a3d921] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold">
              Get Started
            </button>
            </Link>
            <Link href="/contactus">
            <button className="bg-white text-[#036424] border-2 border-[#036424] px-8 py-3 rounded-lg hover:bg-[#036424] hover:text-white transition-colors font-semibold">
              Contact Our Team
            </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />

    </div>
  );
};

export default About;