"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { Recipe } from '@/types';
import { fetchRecipe } from '@/lib/fetcher';

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id as string;
   
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
    if (id) {
      handleFetchRecipe();
    }
  }, [id]);

  const handleFetchRecipe = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipe(id);
      setRecipe(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-700 mb-6">{error || 'The recipe you are looking for does not exist.'}</p>
          <Link href="/" className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{recipe.name} | Recipe Details</title>
        <meta name="description" content={`Learn how to make ${recipe.name}`} />
      </Head>

      <div className="min-h-screen bg-white text-black pb-12">
        {/* Header */}
        <header className="bg-white py-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.name}</h1>
          <p className="text-lg text-gray-600">{recipe.cuisine} Cuisine</p>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Recipe Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-96 object-cover md:h-full"
                />
              </div>
              
              {/* Details */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                {/* Rating and Difficulty */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-medium rounded-full shadow-md">
                    {recipe.difficulty}
                  </span>
                  <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-800">{recipe.rating}</span>
                    <span className="text-gray-500 ml-1">({recipe.reviewCount} reviews)</span>
                  </div>
                </div>
                 
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Prep Time</p>
                        <p className="text-xl font-bold text-gray-900">{recipe.prepTimeMinutes} min</p>
                      </div>
                    </div>
                  </div>
                   
                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Cook Time</p>
                        <p className="text-xl font-bold text-gray-900">{recipe.cookTimeMinutes} min</p>
                      </div>
                    </div>
                  </div>
                   
                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Servings</p>
                        <p className="text-xl font-bold text-gray-900">{recipe.servings}</p>
                      </div>
                    </div>
                  </div>
                   
                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Calories</p>
                        <p className="text-xl font-bold text-gray-900">{recipe.caloriesPerServing} kcal</p>
                      </div>
                    </div>
                  </div>
                </div>
                 
                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 text-sm font-medium rounded-full border border-orange-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients and Instructions */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center border-b border-gray-200 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                Ingredients
              </h2>
              <ul className="space-y-4 text-gray-800">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center border-b border-gray-200 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Instructions
              </h2>
              <ol className="space-y-6 text-gray-800">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start p-4 rounded-lg hover:bg-orange-50 transition-colors">
                    <span className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center mr-6 text-lg font-bold shadow-md">
                      {index + 1}
                    </span>
                    <p className="text-lg leading-relaxed">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}