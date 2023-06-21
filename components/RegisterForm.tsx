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

const RegisterForm: React.FC<{
  disabled?: boolean;
  currentUser?: User | null;
}> = ({ disabled, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = (data) => {
    console.log(data);

    axios
      .post("/api/register", {
        ...data,
      })
      .then((response) => {
        document.getElementById("closeDialog")?.click();

        toast.success("Successfully registered!");
      })
      .catch((err) => {
        toast.error("Registration error!");
      });
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">
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
