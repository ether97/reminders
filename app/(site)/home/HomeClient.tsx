"use client";

import { useGetRemindersQuery } from "@/app/services/reminder";

import { DataTable } from "@/components/Table/DataTable";
import { columns } from "../../../components/Table/ReminderColumns";
import { User } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeClient: React.FC<{ currentUser: User | null }> = ({
  currentUser,
}) => {
  if (!currentUser) {
    return (
      <div className="text-[25px] text-zinc-400 font-extralight animate-bounce">
        Log in to continue...
      </div>
    );
  }

  const { data, isLoading, error } = useGetRemindersQuery();

  if (isLoading) {
    return (
      <>
        <div className="text-[35px] text-neutral-900">
          Welcome back,{" "}
          <span className="font-semibold text-[50px] text-black">
            {currentUser.name}
          </span>
        </div>
        <div className="text-[25px] text-zinc-400 font-extralight animate-bounce">
          Loading your reminders...
        </div>
      </>
    );
  }

  let content;

  if (data) {
    if (window.innerWidth > 600) {
      content = <DataTable columns={columns} data={data} />;
    } else if (window.innerWidth < 600) {
      console.log(window.innerWidth);
      content = (
        <>
          {data.map((item) => (
            <Card
              className={`border-[3px] ${
                item.priority === "High"
                  ? "border-rose-800"
                  : item.priority === "Medium"
                  ? "border-orange-600"
                  : item.priority === "Low"
                  ? "border-green-700"
                  : ""
              } w-full
      `}
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>description</p>
              </CardContent>
              <CardFooter>
                <p>{item.date}</p>
              </CardFooter>
            </Card>
          ))}
        </>
      );
    }

    return (
      <>
        <div className="text-[35px] text-neutral-900">
          Welcome back,{" "}
          <span className="font-semibold text-[50px] text-black">
            {currentUser.name}
          </span>
        </div>
        <div className="text-[25px] text-zinc-400 font-extralight">
          Here are your reminders...
        </div>
        {content}
      </>
    );
  }

  return null;
};

export default HomeClient;
