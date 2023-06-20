import prisma from "../../lib/prismadb";

import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const credentials = await request.json();
  if (!credentials?.email || !credentials?.password) {
    throw new Error("invalid credentials");
  }

  console.log(credentials);

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  console.log(user);

  if (!user || !user?.hashedPassword) {
    throw new Error("User does not exist");
  }

  console.log(user.hashedPassword, credentials.password);

  const isCorrect = await bcrypt.compare(
    credentials.password,
    user.hashedPassword
  );

  console.log(isCorrect);

  if (!isCorrect) {
    throw new Error("invalid password!");
  }

  return user;
}
