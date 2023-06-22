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
import { ImMenu } from "react-icons/im";
import { RxDropdownMenu } from "react-icons/rx";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const HomeClient: React.FC<{ currentUser: User | null }> = ({
  currentUser,
}) => {
  const handleClose = () => {
    document.getElementById("innerSheet")?.click();
    document.getElementById("outerSheet")?.click();
  };
  const handleClick = () => {};
  const { data, isLoading, error } = useGetRemindersQuery();
  console.log(data);

  if (!currentUser) {
    return (
      <>
        <div className="flex flex-row justify-between text-[70px] items-center text-black">
          Welcome
          <Sheet>
            <SheetTrigger>
              <RxDropdownMenu
                size={40}
                className="cursor-pointer text-zinc-400 block sm:hidden"
              />
            </SheetTrigger>
            <SheetContent
              position="right"
              size="full"
              className="h-1/2 border-none bg-neutral-800/10"
            >
              <SheetHeader className="flex flex-col h-full  items-center justify-center">
                <SheetTitle></SheetTitle>
                <SheetDescription className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
                  <SheetClose id="innerSheet" />
                  <Sheet>
                    <SheetTrigger>
                      <Button className="bg-lightbackground text-white w-[100px]">
                        Login
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      position="left"
                      size="full"
                      className="h-1/2 border-none bg-neutral-800/10"
                    >
                      <SheetHeader className="flex flex-col h-full  items-center justify-center">
                        <SheetTitle></SheetTitle>
                        <SheetDescription className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
                          <SheetClose id="outerSheet" />
                          <LoginForm mobile />
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger>
                      <Button className="bg-lightbackground text-white w-[100px]">
                        Register
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      position="left"
                      size="full"
                      className="h-1/2 border-none bg-neutral-800/10"
                    >
                      <SheetHeader className="flex flex-col h-full  items-center justify-center">
                        <SheetTitle></SheetTitle>
                        <SheetDescription className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
                          <SheetClose id="outerSheet" />
                          <RegisterForm mobile />
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-[22px] text-zinc-400 font-extralight animate-pulse">
          Log in to continue...
        </div>
      </>
    );
  }

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
          <DataTable columns={columns} data={data} />
        </div>
        <div className="block sm:hidden">
          {data.map((item) => (
            <Card
              key={item.title}
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
