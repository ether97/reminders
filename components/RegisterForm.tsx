"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";

import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RegisterFormSchemaType } from "@/app/schemas/schemas";
import { registerFormSchema } from "@/app/schemas/schemas";
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import Subcategory from "./Subcategory";
import { User } from "@prisma/client";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import AWS from "aws-sdk";

dotenv.config();

const RegisterForm: React.FC<{
  disabled?: boolean;
  currentUser?: User | null;
  mobile?: boolean;
}> = ({ disabled, currentUser, mobile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0]);
  };

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    // console.log(selectedFile);
    // if (!selectedFile) {
    //   return null;
    // }
    // const s3Data = await axios.post("/api/s3", {
    //   name: selectedFile.name,
    //   type: selectedFile.type,
    // });

    // const url = s3Data.data.url;

    // console.log(url);

    // await axios.put(url, selectedFile, {
    //   headers: {
    //     "Content-type": selectedFile.type,
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });

    axios
      .post("/api/register", data)
      .then((response) => {
        document.getElementById("closeDialog")?.click();

        toast.success("Successfully registered!");
      })
      .catch((err) => {
        toast.error("Registration error!");
      });
  };

  if (mobile) {
    return (
      <>
        {isLoading && (
          <p className="text-center animate-pulse text-[20px]">
            Creating your account...
          </p>
        )}
        {!isLoading && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              type="text"
              id="name"
              {...form.register("name")}
              placeholder="Name"
            />
            {form.formState.errors.name && (
              <ErrorMessage message={form.formState.errors.name?.message} />
            )}
            <Input
              type="text"
              id="email"
              {...form.register("email")}
              placeholder="Email"
            />
            {form.formState.errors.email && (
              <ErrorMessage message={form.formState.errors.email?.message} />
            )}

            <Input
              type="password"
              id="password"
              {...form.register("password")}
              placeholder="Password"
            />
            {form.formState.errors.password && (
              <ErrorMessage message={form.formState.errors.password?.message} />
            )}
            <Input
              type="password"
              id="confirmPassword"
              {...form.register("confirmPassword")}
              placeholder="Re-enter Password"
            />
            {form.formState.errors.confirmPassword && (
              <ErrorMessage
                message={form.formState.errors.confirmPassword?.message}
              />
            )}
            <Button
              type="submit"
              // disabled={isSubmitting}
              className="bg-lightbackground"
            >
              Register
            </Button>
          </form>
        )}
      </>
    );
  }
  return (
    <Dialog>
      <DialogTrigger className="w-full" disabled={currentUser ? true : false}>
        <Subcategory
          label="Register"
          icon={FaUserPlus}
          className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
          disabled
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center text-white">
            {!isLoading && "Register"}
          </DialogTitle>
          <DialogDescription>
            {isLoading && (
              <p className="text-center animate-pulse text-[20px]">
                Creating your account...
              </p>
            )}
            {!isLoading && (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <Input
                  type="text"
                  id="name"
                  {...form.register("name")}
                  placeholder="Name"
                />
                {form.formState.errors.name && (
                  <ErrorMessage message={form.formState.errors.name?.message} />
                )}
                <Input
                  type="text"
                  id="email"
                  {...form.register("email")}
                  placeholder="Email"
                />
                {form.formState.errors.email && (
                  <ErrorMessage
                    message={form.formState.errors.email?.message}
                  />
                )}

                <Input
                  type="password"
                  id="password"
                  {...form.register("password")}
                  placeholder="Password"
                />
                {form.formState.errors.password && (
                  <ErrorMessage
                    message={form.formState.errors.password?.message}
                  />
                )}
                <Input
                  type="password"
                  id="confirmPassword"
                  {...form.register("confirmPassword")}
                  placeholder="Re-enter Password"
                />
                {form.formState.errors.confirmPassword && (
                  <ErrorMessage
                    message={form.formState.errors.confirmPassword?.message}
                  />
                )}
                {/* <Input type="file" onChange={(e) => selectFile(e)} /> */}
                <Button
                  type="submit"
                  // disabled={isSubmitting}
                  className="bg-lightbackground"
                >
                  Register
                </Button>
              </form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
