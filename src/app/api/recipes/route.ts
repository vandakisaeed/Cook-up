import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET recipes for user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ message: "userId is required" }, { status: 400 });

    const recipes = await prisma.recipe.findMany({ where: { userId: Number(userId) }, orderBy: { id: "desc" } });
    const formatted = recipes.map(r => ({
      ...r,
      ingredients: r.ingredients ? JSON.parse(r.ingredients) : [],
      instructions: r.instructions ? JSON.parse(r.instructions) : [],
      tags: r.tags ? JSON.parse(r.tags) : [],
      mealType: r.mealType ? JSON.parse(r.mealType) : [],
    }));

    return NextResponse.json({ recipes: formatted });
  } catch (err: any) { return NextResponse.json({ message: err.message }, { status: 500 }); }
}

// POST new recipe
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId || !body.name) return NextResponse.json({ message: "userId and name required" }, { status: 400 });

    const recipe = await prisma.recipe.create({
      data: {
        name: body.name,
        ingredients: JSON.stringify(body.ingredients || []),
        instructions: JSON.stringify(body.instructions || []),
        prepTimeMinutes: body.prepTimeMinutes ?? null,
        cookTimeMinutes: body.cookTimeMinutes ?? null,
        servings: body.servings ?? null,
        difficulty: body.difficulty ?? null,
        cuisine: body.cuisine ?? null,
        caloriesPerServing: body.caloriesPerServing ?? null,
        tags: JSON.stringify(body.tags || []),
        mealType: JSON.stringify(body.mealType || []),
        image: body.image ?? null,
        rating: body.rating ?? null,
        reviewCount: body.reviewCount ?? null,
        userId: Number(body.userId),
      },
    });

    return NextResponse.json(recipe);
  } catch (err: any) { return NextResponse.json({ message: err.message }, { status: 500 }); }
}

// DELETE single recipe or all recipes
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get("recipeId");
    const userId = searchParams.get("userId");

    if (recipeId) {
      await prisma.recipe.delete({ where: { id: Number(recipeId) } });
      return NextResponse.json({ message: "Recipe deleted" });
    } else if (userId) {
      await prisma.recipe.deleteMany({ where: { userId: Number(userId) } });
      return NextResponse.json({ message: "All recipes deleted" });
    } else {
      return NextResponse.json({ message: "recipeId or userId required" }, { status: 400 });
    }
  } catch (err: any) { return NextResponse.json({ message: err.message }, { status: 500 }); }
}
