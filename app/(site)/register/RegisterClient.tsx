"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { toast } from "react-hot-toast";

const RegisterClient = () => {
  const router = useRouter();
  const onRegister = useCallback(() => {
    axios
      .post<Partial<User> & { password: string }>("/api/register", {
        name: "Test User",
        email: "test@gmail.com",
        password: "test123",
      })
      .then(() => {
        toast.success("user added!");
        router.refresh();
      })
      .catch((err) => {
        toast.error("user not added!");
      });
  }, [router]);

  return <button onClick={onRegister}>Register</button>;
};

export default RegisterClient;
