import React from 'react'

export default function HeroSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* 📝 Left Side - Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#036424] leading-tight">
            FruitLens AI
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            AI-powered fruit inspection system for import/export businesses.
          </p>
          <div className="mt-8">
            <button className="bg-gradient-to-t from-[#a3d920] to-[#036424] text-white px-10 py-4 rounded-full text-sm uppercase tracking-wide hover:from-[#036424] hover:to-[#a3d920] transition duration-300">
              Get Started
            </button>
          </div>
        </div>

        {/* 🎥 Right Side - Video */}
        <div className="flex-2 w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[500px] md:h-[600px] lg:h-[550px] object-cover "
          >
            <source src="/Hero_Clairfresh05-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </section>
  )
}
