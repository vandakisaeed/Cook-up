// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   const res = await fetch("https://dummyjson.com/recipes");
//   const data = await res.json();

//   for (const r of data.recipes) {
//     await prisma.recipe.create({
//       data: {
//         id: r.id,
//         name: r.name,
//         ingredients: JSON.stringify(r.ingredients),     // array → string
//         instructions: JSON.stringify(r.instructions),   // array → string
//         prepTimeMinutes: r.prepTimeMinutes,
//         cookTimeMinutes: r.cookTimeMinutes,
//         servings: r.servings,
//         difficulty: r.difficulty,
//         cuisine: r.cuisine,
//         caloriesPerServing: r.caloriesPerServing,
//         tags: JSON.stringify(r.tags),                   // array → string
//         userId: r.userId,
//         image: r.image,
//         rating: r.rating,
//         reviewCount: r.reviewCount,
//         mealType: JSON.stringify(r.mealType)            // array → string
//       }
//     });
//   }

//   console.log("✅ Recipes imported into Neon!");
// }

// main()
//   .catch(e => {
//     console.error("❌ Error importing recipes:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// src/data/seed.ts













// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding database...");

//   // 1. Tabelle leeren
//   await prisma.recipe.deleteMany();
//   console.log("🗑️ Existing recipes deleted");

//   // 2. Daten von API holen
//   const res = await fetch("https://dummyjson.com/recipes");
//   const data = await res.json();

//   // 3. Neue Rezepte speichern
//   for (const r of data.recipes) {
//     await prisma.recipe.create({
//       data: {
//         id: r.id, // Achtung: bleibt unique!
//         name: r.name,
//         ingredients: JSON.stringify(r.ingredients),     // array → string
//         instructions: JSON.stringify(r.instructions),   // array → string
//         prepTimeMinutes: r.prepTimeMinutes,
//         cookTimeMinutes: r.cookTimeMinutes,
//         servings: r.servings,
//         difficulty: r.difficulty,
//         cuisine: r.cuisine,
//         caloriesPerServing: r.caloriesPerServing,
//         tags: JSON.stringify(r.tags),                   // array → string
//         userId: r.userId,
//         image: r.image,
//         rating: r.rating,
//         reviewCount: r.reviewCount,
//         mealType: JSON.stringify(r.mealType)            // array → string
//       }
//     });
//   }

//   console.log("✅ Recipes imported into Neon!");
// }

// // Run seeding
// main()
//   .catch((e) => {
//     console.error("❌ Error importing recipes:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Zod schema for validating recipes
const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number().int(),
  cookTimeMinutes: z.number().int(),
  servings: z.number().int(),
  difficulty: z.string(),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number().int(),
  image: z.string().url(),
  rating: z.number(),
  reviewCount: z.number().int(),
  mealType: z.array(z.string()),
  description: z.string().optional(), // some API items might not have it
  category: z.string().optional()
});

const RecipesResponseSchema = z.object({
  recipes: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Clear old data
  await prisma.recipe.deleteMany();
  console.log("🗑️ Existing recipes deleted");

  // 2. Fetch from API
  const res = await fetch("https://dummyjson.com/recipes");
  if (!res.ok) throw new Error("❌ Failed to fetch recipes");

  const json = await res.json();

  // 3. Validate response
  const parsed = RecipesResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error("❌ Validation failed:", parsed.error.format());
    throw new Error("API data does not match schema");
  }

  const { recipes } = parsed.data;

  // 4. Insert into DB
  for (const r of recipes) {
    await prisma.recipe.create({
      data: {
        id: r.id, // ⚠️ careful if DB autogenerates IDs
        name: r.name,
        ingredients: JSON.stringify(r.ingredients),
        instructions: JSON.stringify(r.instructions),
        prepTimeMinutes: r.prepTimeMinutes,
        cookTimeMinutes: r.cookTimeMinutes,
        servings: r.servings,
        difficulty: r.difficulty,
        cuisine: r.cuisine,
        caloriesPerServing: r.caloriesPerServing,
        tags: JSON.stringify(r.tags),
        userId: r.userId,
        image: r.image,
        rating: r.rating,
        reviewCount: r.reviewCount,
        mealType: JSON.stringify(r.mealType),
        description: r.description ?? "", // fallback if missing
        category: r.category ?? "Uncategorized",
      },
    });
  }

  console.log(`✅ ${recipes.length} recipes imported into Neon!`);
}

// Run seeding
main()
  .catch((e) => {
    console.error("❌ Error importing recipes:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
