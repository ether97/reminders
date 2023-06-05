"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { signIn } from "next-auth/react";

import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const LoginClient = () => {
  const router = useRouter();

  const { theme, setTheme } = useTheme();

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
      <Button onClick={() => setTheme("light")}>Light</Button>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
    </div>
  );
};

export default LoginClient;
