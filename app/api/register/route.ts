import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, emailVerified, password } = body;

  console.log("register:, ", password);

  // const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email,
      emailVerified: emailVerified,
      name: name,
      hashedPassword: password,
    },
  });

  return NextResponse.json(user);
}
