"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";

import axios from "axios";
import { toast } from "react-hot-toast";

type FormSchemaType = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(1, { message: "Name required!" }),
  email: z.string().email().min(1, { message: "Email required!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmPassword: z
    .string()
    .min(1, { message: "This field cannot be empty!" }),
});
//   .refine((data) => data.password !== data.confirmPassword, {
//     message: "Passwords must match!",
//     path: ["confirm"],
//   });

const RegisterForm = () => {
  const form = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);

    axios
      .post("/api/register", {
        ...data,
      })
      .then((response) => {
        toast.success("Successfully registered!");
      })
      .catch((err) => {
        toast.error("Registration error!");
      });
  };
  return (
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
  );
};

export default RegisterForm;
