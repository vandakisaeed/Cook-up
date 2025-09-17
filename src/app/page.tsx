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