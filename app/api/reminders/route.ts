import { NextResponse } from "next/server";

import prisma from "../../lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

import { ReminderFormSchemaType } from "@/components/CreateReminder";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Must be logged in to add reminders!" },
      { status: 401 }
    );
  }

  console.log(currentUser);

  const body = await request.json();

  console.log(body);

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email as string,
    },
  });

  console.log(user);

  const exists = await prisma.reminder.findUnique({
    where: {
      title: body.title,
    },
  });

  if (exists) {
    return NextResponse.json(
      { error: "Reminder exists, consider changing title!" },
      { status: 409 }
    );
  }

  const reminder = await prisma.reminder.create({
    data: {
      userId: currentUser?.id,
      ...body,
    },
  });

  return NextResponse.json(reminder);
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("no user!");
  }

  const deletedReminders = await prisma.reminder.deleteMany({
    where: {
      userId: currentUser.id,
    },
  });

  return NextResponse.json(currentUser.name);
}

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("no user!");
  }

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  const newReminders = reminders.map((reminder) => ({
    ...reminder,
    date: reminder.date?.toISOString(),
  }));

  return NextResponse.json(newReminders);
}
