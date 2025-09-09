import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RecipePageProps {
  params: { id: string };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
  });

  if (!recipe) {
    return <div className="p-8 text-center text-red-600 font-semibold">❌ Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-900">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-center tracking-tight">
        {recipe.name}
      </h1>

      {/* Image */}
      <div className="w-full h-96 mb-8">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="flex flex-wrap justify-between mb-8 text-gray-800 font-medium bg-gray-100 p-4 rounded-xl shadow-sm">
        <span>⏱ {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} mins</span>
        <span>🍽 Servings: {recipe.servings || "-"}</span>
        <span>⭐ {recipe.rating} ({recipe.reviewCount} reviews)</span>
        <span className="italic">{recipe.cuisine}</span>
      </div>

      {/* Ingredients */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">🛒 Ingredients</h2>
        <ul className="list-disc ml-6 space-y-2 text-lg">
          {JSON.parse(recipe.ingredients).map((ing: string, i: number) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">👨‍🍳 Instructions</h2>
        <ol className="list-decimal ml-6 space-y-3 text-lg leading-relaxed">
          {JSON.parse(recipe.instructions).map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
