"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { Progress } from "@/components/ui/progress";

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

import { formSchema } from "@/app/types/types";

import { FormSchemaType } from "@/app/types/types";

import { FaUserCheck } from "react-icons/fa";
import Skeleton from "./Skeleton";

const LoginForm: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
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
        document.getElementById("closeDialog")?.click();
        router.refresh();
        toast.success("Logged in!");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Subcategory
          label="Login"
          icon={FaUserCheck}
          className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
          // inverted={disabled ? true : false}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">
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
                <Button type="submit" className="bg-lightbackground w-full">
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
