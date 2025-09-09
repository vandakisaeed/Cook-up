import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cuisine = searchParams.get("cuisine");

  if (!cuisine) {
    return NextResponse.json({ error: "Cuisine is required" }, { status: 400 });
  }

  try {
    const recipes = await prisma.recipe.findMany({
      where: { cuisine: { equals: cuisine, mode: "insensitive" } },
      select: {
        id: true,
        name: true,
        image: true,
        prepTimeMinutes: true,
        cookTimeMinutes: true,
        rating: true,
        reviewCount: true,
        cuisine: true,
        tags: true,
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
