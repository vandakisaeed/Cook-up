"use client";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
            About Recipe Center
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover the story behind your favorite culinary destination, where flavors meet passion and community thrives around the joy of cooking.
          </p>
        </div>

        {/* Story Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-20">
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Our kitchen story"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-5 text-gray-900">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Recipe Center began in 2015 as a small blog sharing family recipes. What started as a passion project quickly grew into a vibrant community of food enthusiasts from around the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to host over 10,000 recipes from home cooks and professional chefs alike, all united by a shared love for creating delicious meals that bring people together.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To inspire and empower home cooks of all skill levels to create delicious meals with confidence. We believe that cooking should be accessible, enjoyable, and rewarding for everyone.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To create the world's most inclusive culinary community where everyone feels welcome to share, learn, and grow their cooking skills while celebrating diverse food cultures and traditions.
            </p>
          </div>
        </div>

        {/* Team Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Our Values</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            These principles guide everything we do at Recipe Center, from recipe development to community engagement.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ... (ostatak value kartica ostaje identičan) */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20 border border-orange-100">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Recipe Center By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
              <div className="text-gray-600">Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">500K+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            {/* ...ostatak sekcije identičan */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Culinary Community</h2>
          <p className="text-white max-w-2xl mx-auto mb-6 text-lg">
            Discover thousands of recipes, share your own creations, and connect with food lovers worldwide.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-white text-orange-600 font-bold rounded-full shadow-md hover:bg-gray-100 transition-all hover:scale-105"
          >
            Explore Recipes
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;