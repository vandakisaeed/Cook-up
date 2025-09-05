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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Tabelle leeren
  await prisma.recipe.deleteMany();
  console.log("🗑️ Existing recipes deleted");

  // 2. Daten von API holen
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();

  // 3. Neue Rezepte speichern
  for (const r of data.recipes) {
    await prisma.recipe.create({
      data: {
        id: r.id, // Achtung: bleibt unique!
        name: r.name,
        ingredients: JSON.stringify(r.ingredients),     // array → string
        instructions: JSON.stringify(r.instructions),   // array → string
        prepTimeMinutes: r.prepTimeMinutes,
        cookTimeMinutes: r.cookTimeMinutes,
        servings: r.servings,
        difficulty: r.difficulty,
        cuisine: r.cuisine,
        caloriesPerServing: r.caloriesPerServing,
        tags: JSON.stringify(r.tags),                   // array → string
        userId: r.userId,
        image: r.image,
        rating: r.rating,
        reviewCount: r.reviewCount,
        mealType: JSON.stringify(r.mealType)            // array → string
      }
    });
  }

  console.log("✅ Recipes imported into Neon!");
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
