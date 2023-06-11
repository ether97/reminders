import getCurrentUser from "@/app/actions/getCurrentUser";
import getReminders from "@/app/actions/getReminders";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HomeClient from "./HomeClient";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="h-full w-full p-5">
        <div className="text-[50px]">Welcome</div>
        <div className="text-[25px] text-zinc-400 font-extralight">
          Sign in to continue...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-5">
      <div className="text-[50px]">
        Welcome back, <span className="font-semibold">{currentUser.name}</span>
      </div>

      <HomeClient />
    </div>
  );
}
