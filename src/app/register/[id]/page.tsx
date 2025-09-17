'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number | null;
  cookTimeMinutes: number | null;
  servings: number | null;
  difficulty: string | null;
  cuisine: string | null;
  caloriesPerServing: number | null;
  tags: string[];
  mealType: string[];
  image?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
}

const UserDashboard: React.FC = () => {
  const params = useParams();
  const userId = Number(params.id);
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "",
    cuisine: "",
    caloriesPerServing: "",
    tags: "",
    mealType: "",
    image: "",
    rating: "",
    reviewCount: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`/api/recipes?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch recipes");
      setRecipes(data.recipes);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => { fetchRecipes(); }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRecipe = async () => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ingredients: formData.ingredients.split(",").map(s => s.trim()),
          instructions: formData.instructions.split(".").map(s => s.trim()),
          prepTimeMinutes: formData.prepTimeMinutes ? Number(formData.prepTimeMinutes) : null,
          cookTimeMinutes: formData.cookTimeMinutes ? Number(formData.cookTimeMinutes) : null,
          servings: formData.servings ? Number(formData.servings) : null,
          caloriesPerServing: formData.caloriesPerServing ? Number(formData.caloriesPerServing) : null,
          rating: formData.rating ? Number(formData.rating) : null,
          reviewCount: formData.reviewCount ? Number(formData.reviewCount) : null,
          tags: formData.tags.split(",").map(s => s.trim()),
          mealType: formData.mealType.split(",").map(s => s.trim()),
          userId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add recipe");
      setSuccess("✅ Recipe added!");
      setFormData({
        name: "",
        ingredients: "",
        instructions: "",
        prepTimeMinutes: "",
        cookTimeMinutes: "",
        servings: "",
        difficulty: "",
        cuisine: "",
        caloriesPerServing: "",
        tags: "",
        mealType: "",
        image: "",
        rating: "",
        reviewCount: "",
      });
      fetchRecipes();
    } catch (err: any) { setError(err.message); }
  };

  const handleDeleteRecipe = async (recipeId: number) => {
    try {
      const res = await fetch(`/api/recipes?recipeId=${recipeId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete recipe");
      setSuccess("✅ Recipe deleted");
      fetchRecipes();
    } catch (err: any) { setError(err.message); }
  };

  const handleDeleteAllRecipes = async () => {
    try {
      const res = await fetch(`/api/recipes?userId=${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete all recipes");
      setSuccess("✅ All recipes deleted");
      fetchRecipes();
    } catch (err: any) { setError(err.message); }
  };

  return (
    <div className="min-h-screen text-black p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome User {userId}</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      {/* Recipe Form */}
      <div className="max-w-2xl mb-8 space-y-4">
        {Object.keys(formData).map(key => (
          key === "ingredients" || key === "instructions" ? (
            <textarea key={key} name={key} value={(formData as any)[key]} onChange={handleChange} placeholder={key} className="w-full px-3 py-2 border rounded-md" />
          ) : (
            <input key={key} name={key} value={(formData as any)[key]} onChange={handleChange} placeholder={key} className="w-full px-3 py-2 border rounded-md" />
          )
        ))}
        <button onClick={handleAddRecipe} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">Add Recipe</button>
      </div>
      <button
        onClick={async () => {
          try {
            const res = await fetch(`/api/users?userId=${userId}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to delete user");
            // Redirect after deletion
            router.push("/login"); // or home page
          } catch (err: any) {
            setError(err.message);
          }
        }}
        className="mb-4 ml-2 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md"
      >
        Delete User
      </button>
 
      <button onClick={handleDeleteAllRecipes} className="mb-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">Delete All Recipes</button>

      {/* Recipe List */}
      <h2 className="text-2xl font-semibold mb-4">My Recipes</h2>
      {recipes.length === 0 ? <p>No recipes yet.</p> :
        <div className="grid gap-6 md:grid-cols-2">
          {recipes.map(r => (
            <div key={r.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{r.name}</h3>
              {r.image && <img src={r.image} alt={r.name} className="w-full h-40 object-cover rounded mb-3" />}
              <p><strong>Prep:</strong> {r.prepTimeMinutes} min | <strong>Cook:</strong> {r.cookTimeMinutes} min</p>
              <p><strong>Servings:</strong> {r.servings}</p>
              <p><strong>Difficulty:</strong> {r.difficulty}</p>
              <p><strong>Cuisine:</strong> {r.cuisine}</p>
              <p><strong>Calories:</strong> {r.caloriesPerServing}</p>
              <p><strong>Rating:</strong> {r.rating}</p>
              <p><strong>Review Count:</strong> {r.reviewCount}</p>
              <p><strong>Tags:</strong> {r.tags.join(", ")}</p>
              <p><strong>Meal Type:</strong> {r.mealType.join(", ")}</p>
              <h4 className="mt-2 font-semibold">Ingredients</h4>
              <ul className="list-disc list-inside">{r.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
              <h4 className="mt-2 font-semibold">Instructions</h4>
              <ol className="list-decimal list-inside">{r.instructions.map((i, idx) => <li key={idx}>{i}</li>)}</ol>
              <button onClick={() => handleDeleteRecipe(r.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md">Delete Recipe</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default UserDashboard;
