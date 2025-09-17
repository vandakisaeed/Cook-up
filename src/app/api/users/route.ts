import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE user and all their recipes
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ message: "userId is required" }, { status: 400 });

    await prisma.recipe.deleteMany({ where: { userId: Number(userId) } });
    await prisma.user.delete({ where: { id: Number(userId) } });

    return NextResponse.json({ message: "User and all recipes deleted" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
