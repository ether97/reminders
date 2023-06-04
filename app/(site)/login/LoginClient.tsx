"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { signIn } from "next-auth/react";

import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/Input";

const LoginClient = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("successfully logged in!");
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <div>
      <Input type="text" id="email" register={register} required />
      <Input type="text" id="password" register={register} required />
      <button onClick={handleSubmit(onSubmit)}>Login Button</button>
    </div>
  );
};

export default LoginClient;
