import { NextResponse } from "next/server";

import prisma from "../../lib/prismadb";


import bcrypt from "bcrypt";


import dotenv from "dotenv";

dotenv.config();

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, emailVerified, password } = body;

  console.log(body);

  console.log("register:, ", password);

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // const bucketName = "react-bucket1122";
  // const region = "us-east-1";
  // const accessKeyId = process.env.S3_ACCESS_KEY as string;
  // const secretAccessKey = process.env.S3_SECRET_KEY as string;

  // const s3 = new S3Client({
  //   credentials: {
  //     accessKeyId: accessKeyId,
  //     secretAccessKey: secretAccessKey,
  //   },
  //   region: region,
  // });

  // const params = {
  //   Bucket: bucketName,
  //   Key: "test",
  //   Body: file.buffer,
  //   ContentType: file.mimetype,
  // };

  // const command = new PutObjectCommand(params);

  // await s3.send(command);

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
