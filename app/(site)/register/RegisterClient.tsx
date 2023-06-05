"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

const RegisterClient = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onRegister: SubmitHandler<FieldValues> = (data) => {
    axios
      .post<Partial<User> & { password: string }>("/api/register", data)
      .then(() => {
        toast.success("user added!");
        router.refresh();
      })
      .catch((err) => {
        toast.error("user not added!");
      });
  };

  return <button onClick={handleSubmit(onRegister)}>Register</button>;
};

export default RegisterClient;
