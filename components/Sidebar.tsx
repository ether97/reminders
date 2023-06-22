"use client";

import { Reminder } from "@/app/types/types";

import { User } from "@prisma/client";
import { IChildren } from "../app/types/types";
import { SiClockify } from "react-icons/si";
import { MdLogout } from "react-icons/md";

import Subcategory from "./Subcategory";
import { signOut } from "next-auth/react";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import ReminderList from "./ReminderList";
import CreateReminder from "./CreateReminder";
import { Skeleton } from "./ui/skeleton";
import RegisterForm from "./RegisterForm";
import CreateProject from "./CreateCategory";
import CreateCategory from "./CreateCategory";
import { useGetCategoriesQuery } from "@/app/services/category";
import Category from "./Category";
import CategoryList from "./CategoryList";
import { RiFilePaper2Line } from "react-icons/ri";

const Sidebar: React.FC<IChildren & { currentUser: User | null }> = ({
  children,
  currentUser,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-row h-full divide-x divide-cyan-800">
        <div className="w-[250px] hidden md:flex flex-col p-2">
          <div className="flex flex-col gap-y-1 w-full divide-y divide-cyan-800">
            <Subcategory
              label="Priority Planner"
              icon={SiClockify}
              className="bg-lightbackground py-[43px] text-[20px]"
              inverted
            />
            <div>
              <div className="flex items-center mt-3 mb-2 w-full gap-2">
                <Skeleton className="h-12 w-12 rounded-full bg-lightbackground" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full bg-lightbackground" />
                  <Skeleton className="h-4 w-full bg-lightbackground" />
                </div>
              </div>
            </div>

            <div>
              <Skeleton className="flex flex-row gap-3 items-center w-full px-5 rounded-md text-md py-2 my-2 group bg-lightbackground" />
            </div>
            <Skeleton className="flex flex-row gap-3 items-center w-full px-5 rounded-md text-md py-2 my-2 group bg-lightbackground" />
          </div>
        </div>
        <main className="h-full flex-1 bg-background ">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-full divide-x divide-cyan-800">
      <div className="w-[250px] hidden lg:flex flex-col p-2">
        <div className="flex flex-col gap-y-1 w-full divide-y divide-cyan-800">
          <Subcategory
            label="Priority Planner"
            icon={SiClockify}
            className="bg-lightbackground py-[43px] text-[20px]"
            inverted
          />
          <div>
            {currentUser ? (
              <Subcategory label="Logout" icon={MdLogout} onClick={signOut} />
            ) : (
              <LoginForm disabled={!mounted} currentUser={currentUser} />
            )}

            <RegisterForm
              disabled={!mounted || currentUser ? true : false}
              currentUser={currentUser}
            />
          </div>

          <div>
            {currentUser && (
              <>
                <CreateReminder currentUser={currentUser} />
                <CreateCategory currentUser={currentUser} />
              </>
            )}
          </div>
          {currentUser && (
            <div>
              <Subcategory
                label="My Reminders"
                icon={RiFilePaper2Line}
                inverted
              />

              <CategoryList />
              <ReminderList />
            </div>
          )}
        </div>
      </div>
      <main className="h-full flex-1 bg-background ">{children}</main>
    </div>
  );
};

export default Sidebar;
