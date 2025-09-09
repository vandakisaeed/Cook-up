// "use client"
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { SimpleRecipe } from '@/types';
// import { fetchRecipesByCuisine } from '@/lib/fetcher';

// export default function HomePage() {
//   const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
//   const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<SimpleRecipe[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [allRecipes, setAllRecipes] = useState<SimpleRecipe[]>([]);
//   const searchRef = useRef<HTMLDivElement>(null);

//   // Fetch all recipes on component mount for search functionality
//   useEffect(() => {
//     const fetchAllRecipes = async () => {
//       try {
//         const response = await fetch("https://dummyjson.com/recipes?limit=100");
//         const data = await response.json();
//         setAllRecipes(data.recipes || []);
//       } catch (error) {
//         console.error("Error fetching all recipes:", error);
//       }
//     };

//     fetchAllRecipes();
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFetchRecipesByCuisine = async (cuisine: string) => {
//     setLoading(true);
//     setSelectedCuisine(cuisine);
//     setSearchQuery("");
    
//     try {
//       const data = await fetchRecipesByCuisine(cuisine);
//       setRecipes(data);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//       setRecipes([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
    
//     if (query.trim() === "") {
//       setSearchResults([]);
//       setShowDropdown(false);
//       setSelectedCuisine(null);
//       return;
//     }

//     const filtered = allRecipes.filter(recipe => 
//       recipe.name.toLowerCase().includes(query.toLowerCase()) ||
//       recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
//       recipe.cuisine.toLowerCase().includes(query.toLowerCase()) ||
//       recipe.difficulty.toLowerCase().includes(query.toLowerCase())
//     );

//     setSearchResults(filtered);
//     setShowDropdown(true);
//   };

//   const handleSearchSubmit = () => {
//     if (searchQuery.trim() !== "") {
//       setRecipes(searchResults);
//       setSelectedCuisine("search");
//       setShowDropdown(false);
//     }
//   };

//   const handleResultSelect = (recipe: SimpleRecipe) => {
//     setSearchQuery(recipe.name);
//     setRecipes([recipe]);
//     setSelectedCuisine("search");
//     setShowDropdown(false);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setSearchResults([]);
//     setRecipes([]);
//     setSelectedCuisine(null);
//     setShowDropdown(false);
//   };

//   const cuisineButtons = [
//     { name: "Italian", color: "from-red-500 to-orange-400", emoji: "🍝" },
//     { name: "Indian", color: "from-yellow-500 to-orange-500", emoji: "🍛" },
//     { name: "Asian", color: "from-blue-500 to-purple-500", emoji: "🥢" },
//     { name: "Pakistani", color: "from-green-500 to-teal-500", emoji: "🌶" }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       {/* Hero Section */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           Discover World Cuisines
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
//           Explore delicious recipes from around the globe and bring international flavors to your kitchen
//         </p>
        
//         {/* Search Bar */}
//         <div ref={searchRef} className="relative max-w-2xl mx-auto">
//           <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
//               placeholder="Search by name, tags, cuisine, difficulty..."
//               className="flex-grow px-6 py-4 text-gray-800 focus:outline-none bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={clearSearch}
//                 className="px-4 text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 ✕
//               </button>
//             )}
//             <button
//               onClick={handleSearchSubmit}
//               className="bg-orange-500 text-white px-6 py-4 hover:bg-orange-600 transition-colors"
//             >
//               Search
//             </button>
//           </div>
          
//           {/* Dropdown Results */}
//           {showDropdown && searchResults.length > 0 && (
//             <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
//               {searchResults.map((recipe) => (
//                 <div
//                   key={recipe.id}
//                   onClick={() => handleResultSelect(recipe)}
//                   className="p-4 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
//                 >
//                   <div className="flex items-center">
//                     <img 
//                       src={recipe.image} 
//                       alt={recipe.name}
//                       className="w-12 h-12 object-cover rounded-md mr-4" 
//                     />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
//                       <div className="flex flex-wrap mt-1">
//                         {recipe.tags.slice(0, 3).map((tag, index) => (
//                           <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mr-1 mb-1">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Cuisine Selection - Hidden when search results are shown */}
//       {!selectedCuisine && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//           {cuisineButtons.map((cuisine) => (
//             <div
//               key={cuisine.name}
//               onClick={() => handleFetchRecipesByCuisine(cuisine.name)}
//               className={`group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-r ${cuisine.color}`}
//             >
//               <div className="h-48 flex flex-col items-center justify-center p-6 text-white">
//                 <span className="text-4xl mb-3">{cuisine.emoji}</span>
//                 <span className="text-xl font-semibold text-center">
//                   {cuisine.name} Food
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Recipe Results */}
//       {selectedCuisine && (
//         <div className="mt-8">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {selectedCuisine === "search" ? "Search Results" : `${selectedCuisine} Recipes`}
//             </h2>
//             <button 
//               onClick={clearSearch}
//               className="text-orange-500 hover:text-orange-600 font-medium"
//             >
//               Clear {selectedCuisine === "search" ? "Search" : "Selection"}
//             </button>
//           </div>
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//             </div>
//           ) : recipes.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recipes.map((recipe) => (
//                 <Link 
//                   key={recipe.id} 
//                   href={`/${recipe.id}`}
//                   className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
//                 >
//                   <div>
//                     <img 
//                       src={recipe.image} 
//                       alt={recipe.name} 
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-5">
//                       <h3 className="font-bold text-lg mb-2 text-gray-800">{recipe.name}</h3>
//                       <p className="text-gray-600 mb-3 text-sm">
//                         ⏱ Prep: {recipe.prepTimeMinutes}min | Cook: {recipe.cookTimeMinutes}min
//                       </p>
//                       <div className="flex flex-wrap gap-1 mb-3">
//                         {recipe.tags.slice(0, 3).map((tag, index) => (
//                           <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <span className="text-yellow-400 mr-1">★</span>
//                         <span className="font-medium">{recipe.rating}</span>
//                         <span className="mx-2 text-gray-300">•</span>
//                         <span className="text-sm">{recipe.reviewCount} reviews</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-gray-500 text-lg">
//                 {selectedCuisine === "search" 
//                   ? "No recipes found matching your search." 
//                   : `No recipes found for ${selectedCuisine} cuisine.`}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// app/page.tsx

import { prisma } from "@/lib/prisma";
import { SimpleRecipe } from "@/types";
import RecipesClient from "@/Clientside/RecipesClient";


export const dynamic = "force-dynamic";

export default async function RecipesPage() {
  const recipesFromDb = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      prepTimeMinutes: true,
      cookTimeMinutes: true,
      tags: true,
      rating: true,
      reviewCount: true,
      cuisine: true,
      difficulty: true,
    },
    orderBy: { id: "asc" },
  });

  const recipes: SimpleRecipe[] = recipesFromDb.map((r) => ({
    ...r,
    // ensure tags is always a string array
    tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags || "[]"),
  }));

  const categories: string[] = ["All", ...Array.from(new Set(recipes.map((r) => r.cuisine))).sort()];

  return <RecipesClient initialRecipes={recipes} categories={categories} />;
}
