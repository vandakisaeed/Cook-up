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
    return <div className="p-8 text-center">❌ Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Titel */}
      <h1 className="text-4xl font-bold mb-6 text-center">{recipe.name}</h1>

      {/* Bild */}
      <div className="w-full h-96 mb-6">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Info */}
      <div className="flex flex-wrap justify-between mb-6 text-gray-700">
        <span>⏱ {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} mins</span>
        <span>🍽 Servings: {recipe.servings || "-"}</span>
        <span>⭐ {recipe.rating} ({recipe.reviewCount} reviews)</span>
        <span className="italic">{recipe.cuisine}</span>
      </div>

      {/* Zutaten */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🛒 Ingredients</h2>
        <ul className="list-disc ml-6 space-y-1">
          {JSON.parse(recipe.ingredients).map((ing: string, i: number) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Anleitung */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">👨‍🍳 Instructions</h2>
        <ol className="list-decimal ml-6 space-y-2">
          {JSON.parse(recipe.instructions).map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
