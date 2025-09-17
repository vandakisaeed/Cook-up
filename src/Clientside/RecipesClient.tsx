"use client";

import { useState } from "react";
import { SimpleRecipe } from "@/types";
import Link from "next/link";

interface RecipesClientProps {
  initialRecipes: SimpleRecipe[];
  categories: string[];
}

export default function RecipesClient({ initialRecipes, categories }: RecipesClientProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredRecipes = initialRecipes.filter((r) => {
    const matchesSearch = [r.name, r.cuisine, r.difficulty, ...(r.tags || [])]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "All" || r.cuisine === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-8 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center">Explore New Recipes</h1>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, cuisine, difficulty or tag..."
          className="w-full max-w-lg border rounded-full px-5 py-3 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-orange-500 text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {recipe.image?.trim() && (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="font-bold text-lg mb-2">{recipe.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  ⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins | {recipe.cuisine}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {(recipe.tags || []).slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  ⭐ {recipe.rating} ({recipe.reviewCount} reviews)
                </div>
                <p className="text-xs text-gray-500 mt-1">Difficulty: {recipe.difficulty}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
}
