import { Recipe, SimpleRecipe } from '@/types';

export const fetchRecipe = async (id: string): Promise<Recipe> => {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
   
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
   
  const data: Recipe = await response.json();
  return data;
};

export const fetchRecipesByCuisine = async (cuisine: string): Promise<SimpleRecipe[]> => {
  const response = await fetch(`https://dummyjson.com/recipes/tag/${cuisine}`);
   
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
   
  const data = await response.json();
  return data.recipes || [];
};