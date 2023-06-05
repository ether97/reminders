"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    if (errors.email) {
      reset({ email: "" });
    }
    reset({ email: "", password: "" });
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        type="text"
        id="email"
        {...register("email")}
        placeholder="Email"
      />
      {errors.email && (
        <span className="text-red-800 block">{errors.email?.message}</span>
      )}
      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-800 block">{errors.password?.message}</span>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-lightbackground"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
