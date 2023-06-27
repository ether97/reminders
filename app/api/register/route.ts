import { NextResponse } from "next/server";

import prisma from "../../lib/prismadb";

import pic1 from "../../assets/neom-sqG2iXx6f2k-unsplash.jpg";

import bcrypt from "bcrypt";

import AWS from "aws-sdk";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, emailVerified, password } = body;

  console.log("register:, ", password);

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  };

  AWS.config.update({ credentials: credentials, region: "us-east-1" });

  const s3 = new AWS.S3();

  var presignedPUTURL = s3.getSignedUrl("putObject", {
    Bucket: "react-bucket1122",
    Key: "test-file",
    Body: pic1,
    Expires: 10000,
  });

  console.log(presignedPUTURL);

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
