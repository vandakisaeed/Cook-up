
import { prisma } from "@/lib/prisma";  // <- singleton PrismaClient
import {Recipe} from '@/types/index'

// Page component
export default async function RecipesPage() {
  //const recipes = await getRecipes();
    const recipes = await prisma.recipe.findMany();
  return (
    <div className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">🍲 Recipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recip) => (
          <div key={recip.id} className="card bg-base-100 shadow-sm p-4">
            <h2 className="card-title">{recip.name}</h2>

            {/* Ingredients */}
            <h3 className="font-semibold mt-2">Ingredients:</h3>
            <ul className="list-disc ml-6 mb-2">
              {JSON.parse(recip.ingredients).slice(0, 3).map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            {/* Instructions */}
            <h3 className="font-semibold">Instructions:</h3>
            <ol className="list-decimal ml-6">
              {JSON.parse(recip.instructions).slice(0, 2).map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}


// export default async function RecipesPage() {
//   const recipes = await getRecipes();
//   console.log("DEBUG recipes:", recipes);  // <--- check server logs

//   return
// }