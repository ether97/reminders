"use client";

import { useGetRemindersQuery } from "@/app/services/reminder";

import { DataTable } from "@/components/Table/DataTable";
import { columns } from "../../../components/Table/ReminderColumns";
import { User } from "@prisma/client";

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
import DataCard from "@/components/DataCard";
import SheetParent from "@/components/SheetParent";
import CategoryList from "@/components/CategoryList";
import CreateReminder from "@/components/CreateReminder";
import CreateCategory from "@/components/CreateCategory";
import { signOut } from "next-auth/react";

const HomeClient: React.FC<{ currentUser: User | null }> = ({
  currentUser,
}) => {
  const handleClose = () => {
    document.getElementById("innerSheet")?.click();
    document.getElementById("outerSheet")?.click();
  };
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
                className="cursor-pointer text-zinc-400 block lg:hidden"
              />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="h-1/2 border-none bg-neutral-800/10"
            >
              <SheetHeader className="flex flex-col h-full  items-center justify-center">
                <SheetTitle></SheetTitle>
                <SheetDescription className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
                  <SheetClose id="innerSheet" />
                  <div className="w-1/2 flex flex-col gap-y-4">
                    <SheetParent
                      trigger={
                        <Button className="bg-lightbackground text-white w-full">
                          Login
                        </Button>
                      }
                      content={<LoginForm mobile />}
                      position="left"
                      type="outer"
                    />
                    <SheetParent
                      trigger={
                        <Button className="bg-lightbackground text-white w-full">
                          Register
                        </Button>
                      }
                      content={<RegisterForm mobile />}
                      position="left"
                      type="outer"
                    />
                  </div>
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
        <div className="text-[35px] text-white">
          Welcome back,{" "}
          <span className="font-semibold text-[50px] text-white">
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
        <div className="hidden lg:block">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="block lg:hidden">
          <CategoryList />
          {data.map((item) => {
            if (!item.categoryTitle) {
              return <DataCard key={item.title} item={item} />;
            }
          })}
        </div>
      </>
    );

    return (
      <>
        <div className="flex flex-row justify-between text-[35px] items-center text-white">
          <div>
            Welcome back,{" "}
            <span className="font-semibold text-[50px] text-white">
              {currentUser.name}
            </span>
          </div>
          <Sheet>
            <SheetTrigger>
              <RxDropdownMenu
                size={40}
                className="cursor-pointer text-zinc-400 block lg:hidden"
              />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="h-1/2 border-none bg-neutral-800/10"
            >
              <SheetHeader className="flex flex-col h-full  items-center justify-center">
                <SheetTitle></SheetTitle>
                <SheetDescription className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
                  <SheetClose id="innerSheet" />
                  <div className="w-1/2 flex flex-col gap-y-4">
                    <SheetParent
                      trigger={
                        <Button className="bg-lightbackground text-white w-full">
                          CreateReminder
                        </Button>
                      }
                      content={
                        <CreateReminder currentUser={currentUser} mobile />
                      }
                      position="left"
                      type="outer"
                    />
                    <SheetParent
                      trigger={
                        <Button className="bg-lightbackground text-white w-full">
                          Create Category
                        </Button>
                      }
                      content={
                        <CreateCategory currentUser={currentUser} mobile />
                      }
                      position="left"
                      type="outer"
                    />
                    <Button
                      className="bg-lightbackground text-white w-full"
                      onClick={() => signOut()}
                    >
                      Log Out
                    </Button>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-[25px] text-zinc-400 font-extralight mb-3">
          Here are your reminders...
        </div>
        {content}
      </>
    );
  }

  return null;
};

export default HomeClient;

