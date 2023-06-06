"use client";

import { Reminder, User } from "@prisma/client";
import { IChildren } from "../app/types/types";
import { MdOutlineNewLabel } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import ReminderComponent from "./Reminder";

import Subcategory from "./Subcategory";
import { useState } from "react";
import Modal from "./Modal";
import { signOut } from "next-auth/react";

const Sidebar: React.FC<
  IChildren & { currentUser: User | null; reminders: Reminder[] | null }
> = ({ children, currentUser, reminders }) => {
  return (
    <div className="flex flex-row h-full divide-x divide-cyan-800">
      <div className="w-[250px] hidden md:flex flex-col p-2">
        <div className="flex flex-col gap-y-1 w-full divide-y divide-cyan-800">
          <div>
            {currentUser ? (
              <Subcategory label="Logout" icon={MdLogout} onClick={signOut} />
            ) : (
              <Modal label="Login" icon={FaUserCheck} />
            )}

            <Modal label="Register" icon={FaUserPlus} />
          </div>

          <div>
            <Modal label="Create Reminder" icon={MdOutlineNewLabel} />
          </div>
          <div className="flex flex-col w-full">
            <Subcategory
              label="My Reminders"
              icon={RiFilePaper2Line}
              inverted
            />
            {reminders?.map((reminder) => (
              <ReminderComponent
                key={reminder.title}
                label={reminder.title}
                priority={reminder.priority}
              />
            ))}
          </div>
        </div>
      </div>
      <main className="h-full flex-1 bg-background ">{children}</main>
    </div>
  );
};

export default Sidebar;
