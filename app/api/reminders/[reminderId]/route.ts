import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "../../../lib/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { reminderId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reminderId } = params;

  if (!reminderId || typeof reminderId !== "string") {
    throw new Error("Invalid ID");
  }

  const reminder = await prisma.reminder.delete({
    where: {
      id: reminderId,
    },
  });

  return NextResponse.json(reminder);
}

export async function PATCH(
  request: Request,
  { params }: { params: { reminderId: string } }
) {
  const data = await request.json();

  console.log(data);

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reminderId } = params;

  if (!reminderId || typeof reminderId !== "string") {
    throw new Error("Invalid ID");
  }

  const reminder = await prisma.reminder.update({
    where: {
      id: reminderId,
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json(reminder);
}
