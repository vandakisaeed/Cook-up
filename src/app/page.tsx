
import { PrismaClient } from "@prisma/client";
import RecipesPageClient from "@/Clientside/RecipesPageClient.tsx";

const prisma = new PrismaClient();

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany();
  return <RecipesPageClient recipes={recipes} />;
}
