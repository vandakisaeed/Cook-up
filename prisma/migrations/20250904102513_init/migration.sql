-- CreateTable
CREATE TABLE "public"."Recipe" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
