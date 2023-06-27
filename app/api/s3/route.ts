import S3 from "aws-sdk/clients/s3";

import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();

export async function POST(request: Request) {
  const body = await request.json();

  const { name, type } = body;

  console.log(name, type);

  const s3 = new S3({
    region: "us-east-1",
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
    signatureVersion: "v4",
  });

  const fileParams = {
    Bucket: "react-bucket1122",
    Key: name,
    Expires: 600,
    ContentType: type,
    ACL: "public-read",
  };

  const url = await s3.getSignedUrlPromise("putObject", fileParams);

  console.log(url);

  return NextResponse.json({ url: url });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
