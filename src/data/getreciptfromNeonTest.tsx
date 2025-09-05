import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getRecipes() {
  const recipes = await prisma.recipe.findMany();
  console.log(recipes);
}
getRecipes()