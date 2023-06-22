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
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPenFill } from "react-icons/bs";

const HomeClient: React.FC<{ currentUser: User | null }> = ({
  currentUser,
}) => {
  const handleClick = () => {};

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
    content = (
      <>
        <div className="hidden sm:block">
          <DataTable columns={columns} data={data} />;
        </div>
        <div className="block sm:hidden">
          {data.map((item) => (
            <Card
              className={`w-full border-none my-2 
              ${
                item.priority === "High"
                  ? "bg-gradient-to-br from-rose-800"
                  : item.priority === "Medium"
                  ? "bg-gradient-to-br from-orange-600"
                  : item.priority === "Low"
                  ? "bg-gradient-to-br from-green-700"
                  : ""
              }
                `}
            >
              <CardHeader>
                <CardTitle className="flex flex-row justify-between w-full">
                  {item.title}
                  <div className="flex flex-row gap-2 items-center">
                    <BsPenFill
                      size={16}
                      className="text-white cursor-pointer hover:scale-125 transition duration-300 ease-in-out"
                    />
                    <AiOutlineCloseCircle
                      onClick={handleClick}
                      size={20}
                      className=" cursor-pointer  text-rose-600 hover:scale-125 transition duration-200 hover:rotate-180"
                    />
                  </div>
                </CardTitle>
                <CardDescription>{item.categoryTitle ?? ""}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>description</p>
              </CardContent>
              <CardFooter>
                <p>{item.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );

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
