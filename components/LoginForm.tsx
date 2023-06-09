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
import { HTMLAttributes } from "react";

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

import { FaUserCheck } from "react-icons/fa";

type FormSchemaType = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
});

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in!");
        router.refresh();
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
          // className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
          // inverted={disabled ? true : false}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">Login</DialogTitle>
          <DialogDescription>
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
              <Button type="submit" className="bg-lightbackground w-full">
                <DialogClose />
                Login
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
