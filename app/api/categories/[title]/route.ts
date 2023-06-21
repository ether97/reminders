import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { title: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const { title } = params;

  const deletedCategory = await prisma.category.deleteMany({
    where: {
      AND: [
        {
          userId: currentUser.id,
        },
        {
          title: title,
        },
      ],
    },
  });

  return NextResponse.json(deletedCategory);
}

export async function POST(
  request: Request,
  { params }: { params: { title: string } }
) {
  const currentUser = await getCurrentUser();

  const { title } = params;

  console.log("title: ", title);

  if (!currentUser) return null;

  const category = await prisma.category.create({
    data: {
      userId: currentUser.id,
      title: title,
    },
  });

  return NextResponse.json(category);
}
