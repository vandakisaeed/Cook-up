-- AlterTable
ALTER TABLE "public"."Recipe" ADD COLUMN     "caloriesPerServing" INTEGER,
ADD COLUMN     "cookTimeMinutes" INTEGER,
ADD COLUMN     "cuisine" TEXT,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "mealType" TEXT,
ADD COLUMN     "prepTimeMinutes" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviewCount" INTEGER,
ADD COLUMN     "servings" INTEGER,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "userId" INTEGER;
