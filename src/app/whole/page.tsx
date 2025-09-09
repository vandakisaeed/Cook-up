


import { fetchJSON } from "@/lib/fetcher";
import { Recipe } from "@/types";

export default async function ItalianFood() {
  const data = await fetchJSON<{ recipes: Recipe[] }>(
    "https://dummyjson.com/recipes"
  );

  const italFood = data.recipes;

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl text-gray-800 font-bold mb-8 text-center">🍝 All Cuisines</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {italFood.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.name}
              className="w-48 h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{post.name}</h3>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Servings:</strong> {post.servings} |{" "}
              <strong>Calories:</strong> {post.caloriesPerServing}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              ⏱ {post.prepTimeMinutes + post.cookTimeMinutes} min |{" "}
              <span className="capitalize">{post.difficulty}</span>
            </p>

            {/* Ingredients */}
            <div className="w-full text-left mb-4">
              <h4 className="font-medium text-md mb-1">Ingredients</h4>
              <ul className="text-sm list-disc  text-gray-600 mb-3 list-inside max-h-24 overflow-y-auto">
                {post.ingredients.slice(0, 5).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Collapsible Instructions */}
            <details className="w-full">
              <summary className="cursor-pointer font-medium text-md text-blue-600 hover:underline mb-2">
                Show Instructions
              </summary>
              <ol className="text-sm list-decimal  text-gray-600 mb-3 list-inside space-y-1 mt-2 text-left">
                {post.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
