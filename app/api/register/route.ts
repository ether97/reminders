import { NextResponse } from "next/server";

import prisma from "../../lib/prismadb";

import bcrypt from "bcrypt";

import { Priority } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, emailVerified, password } = body;

  console.log("register:, ", password);

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email: email,
      emailVerified: emailVerified,
      name: name,
      hashedPassword: hashedPassword,
    },
  });

  // const reminder = await prisma.reminder.create({
  //   data: {
  //     userId: user.id,
  //     title: "handle Atmaja",
  //     description: "shes throwing a tantrum",
  //     recurring: true,
  //     priority: Priority.HIGH,
  //     recurringFreq: 1,
  //   },
  // });

  return NextResponse.json(user);
}
