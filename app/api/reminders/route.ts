import { NextFetchEvent, NextResponse } from "next/server";

import prisma from "../../lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Reminder } from "@/app/types/types";

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in!");
  }

  const user = await prisma.reminder.deleteMany({
    where: {
      userId: currentUser.id,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in!");
  }

  const data: Pick<
    Reminder,
    "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
  > = await request.json();

  console.log(data);

  const { id, ...withoutId } = data;

  const updateReminder = await prisma.reminder.update({
    where: {
      id: id,
    },
    data: {
      ...withoutId,
    },
  });

  return NextResponse.json(updateReminder);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in!");
  }

  const data: Pick<
    Reminder,
    "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
  >[] = await request.json();

  console.log(data);

  let earliest = "2050-06-22";
  let title = "";
  let priority = "";

  for (let reminder of data) {
    title += reminder.title;
    if (reminder.date < earliest) {
      earliest = reminder.date;
    } else if (reminder.date === earliest) {
      if (reminder.priority === "High") {
        priority === "High";
      } else if (reminder.priority === "Medium" && priority !== "High") {
        priority = "Medium";
      }
      priority === "Low";
    }
  }

  const obj = {
    time: earliest,
    title: title,
    priority: priority,
  };
  console.log(earliest, title, priority);

  return NextResponse.json(obj);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const exists = await prisma.reminder.findUnique({
    where: {
      title: body.title,
    },
  });

  if (exists) {
    throw new Error("deadline already exists!");
  }

  const reminder = await prisma.reminder.create({
    data: {
      userId: currentUser?.id,
      ...body,
    },
  });

  const deadlines = [...(currentUser.deadlines || [])];

  deadlines.push(reminder.id);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      deadlines,
    },
  });

  return NextResponse.json(user);
}

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("no user!");
  }

  const deadlines = await prisma.reminder.findMany({
    where: {
      id: {
        in: currentUser.deadlines,
      },
    },
  });

  console.log("deadlines:", deadlines);

  return NextResponse.json(deadlines);
}
