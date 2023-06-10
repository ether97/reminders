"use server";

import getCurrentUser from "./getCurrentUser";
import prisma from "../lib/prismadb";
import { ReminderFormSchemaType } from "@/components/CreateReminder";

export const addReminder = async (reminder: ReminderFormSchemaType) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const existingReminder = await prisma.reminder.findUnique({
    where: {
      title: reminder.title,
    },
  });

  if (existingReminder) {
    return null;
  }

  const newReminder = await prisma.reminder.create({
    data: {
      userId: currentUser.id,
      ...reminder,
    },
  });

  return newReminder;
};
