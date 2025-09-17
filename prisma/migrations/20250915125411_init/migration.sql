-- AlterTable
CREATE SEQUENCE "public".recipe_id_seq;
ALTER TABLE "public"."Recipe" ALTER COLUMN "id" SET DEFAULT nextval('"public".recipe_id_seq');
ALTER SEQUENCE "public".recipe_id_seq OWNED BY "public"."Recipe"."id";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
