"use client";

import { useState } from "react";
import Link from "next/link";

interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  rating?: number;
  cuisine?: string;
}

interface RecipesPageProps {
  recipes: Recipe[];
}

export default function RecipesPageClient({ recipes }: RecipesPageProps) {
  const [filter, setFilter] = useState<string>("All");

  // Updated categories
  const categories = ["All", ...Array.from(new Set(recipes.map((r) => r.cuisine).filter(Boolean)))]; //.map(r => r.cuisine) – get all cuisine values.

                                                                                                      //  .filter(Boolean) – remove falsy values (like undefined).

                                                                                                       // new Set(categories) – creates a Set, which only keeps unique values.

                                                                                                      //  Array.from(...) – converts the Set back to an array.

                                                                                                      //  Add "All" at the start for your default category.

  const filteredRecipes =
    filter === "All"
      ? recipes
      : recipes.filter((r) => r.cuisine?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🍲 Recipes</h1>

      {/* Category buttons at the top */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`btn btn-sm ${
              filter === cat ? "btn-primary" : "btn-outline"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((r) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl overflow-hidden block"
          >
            <figure className="h-56 w-full overflow-hidden">
              <img
                src={r.image || "/placeholder.png"}
                alt={r.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">{r.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {JSON.parse(r.ingredients).slice(0, 3).join(", ")}...
              </p>
              <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  ⏱ {(r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0)} mins
                </span>
                <span className="badge badge-secondary">⭐ {r.rating || 0}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
