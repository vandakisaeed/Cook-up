import { z } from 'zod';

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
  description: z.string().min(1), // optional, if you want to require it
  category: z.string()            // optional, adjust if you need it
});

type Product = z.infer<typeof ProductSchema>;

export const fetchRecipe = async (): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/recipes`);
   
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
   
  const resData: Product = await response.json();
  const { data, error, success } = ProductSchema.safeParse(resData);
  if (!success)
    // The API returned data that doesn't match our schema.
    throw new Error(z.prettifyError(error));
  // If we're here, data is valid. Return the type-safe result.
  return data;
};