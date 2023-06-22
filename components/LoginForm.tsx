"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Subcategory from "./Subcategory";

import { formSchema } from "@/app/schemas/schemas";

import { FormSchemaType } from "@/app/schemas/schemas";

import { FaUserCheck } from "react-icons/fa";
import { User } from "@prisma/client";

const LoginForm: React.FC<{
  disabled?: boolean;
  currentUser?: User | null;
  mobile?: boolean;
}> = ({ disabled, currentUser, mobile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.refresh();
        document.getElementById("closeDialog")?.click();
        reset();
        toast.success("Logged in!");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (mobile) {
    return (
      <>
        {isLoading && (
          <p className="text-center animate-pulse text-[20px]">
            Logging you in...
          </p>
        )}
        {!isLoading && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              type="text"
              id="email"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && <ErrorMessage message={errors.email?.message} />}

            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
            <Button
              type="submit"
              className="bg-lightbackground w-full text-white"
            >
              Login
            </Button>
          </form>
        )}
      </>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Subcategory
          label="Login"
          icon={FaUserCheck}
          className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center text-white">
            {!isLoading && "Login"}
          </DialogTitle>
          <DialogDescription>
            {isLoading && (
              <p className="text-center animate-pulse text-[20px]">
                Logging you in...
              </p>
            )}
            {!isLoading && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <Input
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="Email"
                />
                {errors.email && (
                  <ErrorMessage message={errors.email?.message} />
                )}

                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Password"
                />
                {errors.password && (
                  <ErrorMessage message={errors.password?.message} />
                )}
                <Button
                  type="submit"
                  className="bg-lightbackground w-full text-white"
                >
                  Login
                </Button>
              </form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
