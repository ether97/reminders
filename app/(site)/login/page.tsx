import LoginClient from "./LoginClient";

import { Button } from "../../../components/ui/button";
import { useEffect } from "react";
import axios from "axios";

import { toast } from "react-hot-toast";
import getReminders from "@/app/actions/getReminders";

export default async function Login() {
  const reminders = await getReminders();
  console.log(reminders);
  return (
    <div className="flex flex-col items-center justify-center">
      <LoginClient />
    </div>
  );
}
