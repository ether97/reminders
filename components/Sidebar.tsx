"use client";

import { Reminder, User } from "@prisma/client";
import { IChildren } from "../app/types/types";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { SiClockify } from "react-icons/si";
import { MdLogout } from "react-icons/md";

import Subcategory from "./Subcategory";
import Modal from "./Modal";
import { signOut } from "next-auth/react";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import ReminderList from "./ReminderList";
import CreateReminder from "./CreateReminder";

const Sidebar: React.FC<
  IChildren & { currentUser: User | null; reminders: Reminder[] | null }
> = ({ children, currentUser, reminders }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-row h-full divide-x divide-cyan-800 overflow-y-scroll">
      <div className="w-[250px] hidden md:flex flex-col p-2">
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
              <LoginForm disabled={!mounted} />
            )}

            <Modal label="Register" icon={FaUserPlus} disabled={!mounted} />
          </div>

          <div>
            <CreateReminder />
          </div>

          {currentUser && <ReminderList />}
        </div>
      </div>
      <main className="h-full flex-1 bg-background ">{children}</main>
    </div>
  );
};

export default Sidebar;
