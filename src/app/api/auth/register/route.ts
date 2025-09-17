import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!email || !name) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Prevent duplicate registration
    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (existing) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name: trimmedName, email: trimmedEmail },
    });

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
