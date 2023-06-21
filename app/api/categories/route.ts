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
    select: {
      title: true,
    },
  });

  const justTitles = categories.map((category) => category.title);

  console.log("justTitles:", justTitles);

  return NextResponse.json(justTitles);
}

