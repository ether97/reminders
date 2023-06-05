import { NextResponse } from "next/server";

import prisma from "../../lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  const reminder = await prisma.reminder.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(reminder);
}
