import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "../lib/prismadb";
import { useDispatch } from "react-redux";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getReminders() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const reminders = await prisma.reminder.findMany();

    if (!reminders) {
      return null;
    }

    return reminders;
  } catch (error) {
    return null;
  }
}
