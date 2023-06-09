import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "../lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getReminders() {
  try {
    const session = await getSession();
    console.log(session);
    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    console.log(user);

    const reminders = await prisma.reminder.findMany({
      where: {
        userId: user?.id,
      },
    });
    console.log(reminders);
    if (!reminders) {
      return null;
    }

    return reminders;
  } catch (error) {
    return null;
  }
}
