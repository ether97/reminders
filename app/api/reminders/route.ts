import { NextResponse } from "next/server";

import prisma from "../../lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Must be logged in to add reminders!");
  }

  console.log(currentUser);

  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email as string,
    },
  });

  const reminder = await prisma.reminder.create({
    data: {
      userId: user?.id,
      ...body,
    },
  });

  return NextResponse.json(reminder);
}
