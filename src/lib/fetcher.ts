import { Recipe, SimpleRecipe } from '@/types';




// lib/fetcher.ts
export async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json() as Promise<T>;
}




export const fetchRecipe = async (id: string): Promise<Recipe> => {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
   
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
   
  const data: Recipe = await response.json();
  return data;
};

// export const fetchRecipesByCuisine = async (cuisine: string): Promise<SimpleRecipe[]> => {
//   const response = await fetch(`https://dummyjson.com/recipes/tag/${cuisine}`);
   
//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }
//   const data = await response.json();
//   return data.recipes || [];
// };


export async function fetchRecipesByCuisine(cuisine: string): Promise<SimpleRecipe[]> {
  const res = await fetch(`/api/recipes/by-cuisine?cuisine=${encodeURIComponent(cuisine)}`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

