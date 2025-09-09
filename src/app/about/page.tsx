import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Welcome to <span className="font-semibold">Recipe Center</span>, your go-to
          destination for discovering, sharing, and enjoying delicious recipes
          from around the world.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
  <div>
    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
    <p className="text-gray-600 leading-relaxed">
      We believe food is more than just sustenance—it's a way to connect,
      celebrate, and create memories. Our mission is to make cooking easy
      and fun by providing clear instructions, inspiring ideas, and a
      community of passionate food lovers.
    </p>
  </div>
  <div className="rounded-2xl overflow-hidden shadow-md h-64 md:h-80">
    <img
      src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80"
      alt="Cooking together"
      className="w-full h-full object-cover"
    />
  </div>
</div>


        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">What We Value</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Creativity</h3>
              <p className="text-gray-600">
                Explore unique recipes and put your own twist on classics.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Share your favorite dishes and connect with other food lovers.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
              <p className="text-gray-600">
                Step-by-step instructions designed for cooks of all levels.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Whether you're a seasoned chef or just starting your cooking
            adventure, Recipe Center is here to inspire and support you. Let’s
            make something delicious together!
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-2xl shadow hover:bg-green-700 transition"
          >
            Explore Recipes
          </a>
        </div>
      </div>
    </div>
  );
}