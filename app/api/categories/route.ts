import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const categories = await prisma.category.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  const body = await request.json();

  if (!currentUser) return null;

  const category = await prisma.category.create({
    data: {
      userId: currentUser.id,
      ...body,
    },
  });

  return NextResponse.json(category);
}
