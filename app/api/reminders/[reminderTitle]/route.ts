import getCurrentUser from "@/app/actions/getCurrentUser";
import { Reminder } from "@/app/types/types";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { reminderTitle: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in!");
  }

  const { reminderTitle } = params;

  console.log(reminderTitle);

  const reminders = await prisma.reminder.deleteMany({
    where: {
      categoryTitle: reminderTitle,
    },
  });

  return NextResponse.json(reminders);
}
















export async function PATCH(
  request: Request,
  { params }: { params: { reminderTitle: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in!");
  }

  const { reminderTitle } = params;

  console.log(reminderTitle);

  const data: Pick<
    Reminder,
    "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
  > = await request.json();

  console.log(data);

  const { id, ...withoutId } = data;

  const updateReminder = await prisma.reminder.update({
    where: {
      title: reminderTitle,
    },
    data: {
      ...withoutId,
    },
  });

  return NextResponse.json(updateReminder);
}
