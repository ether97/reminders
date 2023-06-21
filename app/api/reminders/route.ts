import { NextResponse } from "next/server";

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
      id: currentUser.id,
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

  const result = data.reduce((acc, reminder) => {
    const compareDates = (
      acc: Pick<
        Reminder,
        "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
      >,
      reminder: Pick<
        Reminder,
        "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
      >
    ) => {
      if (!acc.date) {
        return { id: reminder.id, date: reminder.date };
      }
      if (!reminder.date) {
        return { id: acc.id, date: acc.date };
      }
      if (acc.date < reminder.date) {
        return { id: acc.id, date: acc.date };
      }
      if (reminder.date < acc.date) {
        return { id: reminder.id, date: reminder.date };
      }
      if (!acc.time) {
        return {
          id: reminder.id,
          date: reminder.date,
          time: reminder.time,
        };
      }
      if (!reminder.time) {
        return { id: acc.id, date: acc.date, time: acc.time };
      }
      if (new Date(acc.time) < new Date(reminder.time)) {
        return { id: acc.id, date: acc.date, time: acc.time };
      }
      if (new Date(reminder.time) < new Date(acc.time)) {
        return {
          id: reminder.id,
          date: reminder.date,
          time: reminder.time,
        };
      }
      return {
        id: reminder.id,
        date: reminder.date,
        time: reminder.time,
      };
    };
    const result = compareDates(reminder, acc);
    return {
      ...acc,
      categoryId: reminder.categoryTitle ?? "",
      title: `${reminder.title} ${acc.title}`,
      date: reminder.date || result.date,
      time: reminder.time || result.time,
      priority: reminder.priority,
    };
  });

  const newObject = await prisma.reminder.create({
    data: {
      categoryTitle: result.categoryTitle ?? "",
      userId: currentUser.id,
      title: result.title,
      date: result.date,
      time: result.time,
      priority: result.priority,
    },
  });

  const deadlines = [...(currentUser.deadlines || [])];

  deadlines.push(newObject.id);

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
