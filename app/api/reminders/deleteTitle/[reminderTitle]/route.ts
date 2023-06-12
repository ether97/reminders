import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "../../../../lib/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { reminderTitle: string } }
) {
  const currentUser = await getCurrentUser();
  console.log(params);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reminderTitle } = params;

  if (!reminderTitle || typeof reminderTitle !== "string") {
    throw new Error("Invalid ID");
  }

  const reminder = await prisma.reminder.delete({
    where: {
      title: reminderTitle,
    },
  });

  return NextResponse.json(reminder);
}
