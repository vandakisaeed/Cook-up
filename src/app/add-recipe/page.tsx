'use client'

import React, { useState } from "react";

interface RecipeForm {
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string;
  mealType: string;
  image: string;
  description: string;
  category: string;
}

const AddRecipePage: React.FC = () => {
  const [formData, setFormData] = useState<RecipeForm>({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: "",
    cuisine: "",
    caloriesPerServing: 0,
    tags: "",
    mealType: "",
    image: "",
    description: "",
    category: "",
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setSuccess("✅ Recipe added successfully!");
      setFormData({
        name: "",
        ingredients: "",
        instructions: "",
        prepTimeMinutes: 0,
        cookTimeMinutes: 0,
        servings: 1,
        difficulty: "",
        cuisine: "",
        caloriesPerServing: 0,
        tags: "",
        mealType: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (err: any) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Add Your Recipe</h1>

        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Recipe Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            name="instructions"
            placeholder="Instructions (comma separated)"
            value={formData.instructions}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            name="prepTimeMinutes"
            type="number"
            placeholder="Prep Time (minutes)"
            value={formData.prepTimeMinutes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="cookTimeMinutes"
            type="number"
            placeholder="Cook Time (minutes)"
            value={formData.cookTimeMinutes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="servings"
            type="number"
            placeholder="Servings"
            value={formData.servings}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="difficulty"
            type="text"
            placeholder="Difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="cuisine"
            type="text"
            placeholder="Cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="caloriesPerServing"
            type="number"
            placeholder="Calories per serving"
            value={formData.caloriesPerServing}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="tags"
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="mealType"
            type="text"
            placeholder="Meal Type (comma separated)"
            value={formData.mealType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="image"
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-medium transition"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
