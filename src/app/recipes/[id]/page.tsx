// app/recipes/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { Recipe } from "@/types";

interface RecipePageProps {
  params: { id: string };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
  });

  if (!recipe) {
    return <div className="p-8 text-center">❌ Recipe not found</div>;
  }

  const parsedRecipe: Recipe = {
    ...recipe,
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : JSON.parse(recipe.ingredients || "[]"),
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions
      : JSON.parse(recipe.instructions || "[]"),
    tags: Array.isArray(recipe.tags)
      ? recipe.tags
      : JSON.parse(recipe.tags || "[]"),
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {parsedRecipe.name}
      </h1>

      <div className="w-full h-96 mb-6">
        <img
          src={parsedRecipe.image}
          alt={parsedRecipe.name}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="flex flex-wrap justify-between mb-6 text-gray-700">
        <span>
          ⏱{" "}
          {(parsedRecipe.prepTimeMinutes || 0) +
            (parsedRecipe.cookTimeMinutes || 0)}{" "}
          mins
        </span>
        <span>🍽 Servings: {parsedRecipe.servings || "-"}</span>
        <span>
          ⭐ {parsedRecipe.rating} ({parsedRecipe.reviewCount} reviews)
        </span>
        <span className="italic">{parsedRecipe.cuisine}</span>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🛒 Ingredients</h2>
        <ul className="list-disc ml-6 space-y-1">
          {parsedRecipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">👨‍🍳 Instructions</h2>
        <ol className="list-decimal ml-6 space-y-2">
          {parsedRecipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
