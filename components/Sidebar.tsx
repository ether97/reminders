"use client";

import { User } from "@prisma/client";
import { IChildren, SubCategories } from "../app/types/types";
import Category from "./Category";
import { MdOutlineNewLabel } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import LoginForm from "./LoginForm";
import Subcategory from "./Subcategory";

const subCategories: SubCategories[] = [
  {
    label: "Login",
    icon: FaUserCheck,
  },
  {
    label: "Register",
    icon: FaUserPlus,
  },
  {
    category: "Create",
    label: "Reminder",
    icon: MdOutlineNewLabel,
  },
];

const Sidebar: React.FC<IChildren & { currentUser: User | null }> = ({
  children,
  currentUser,
}) => {
  return (
    <div className="flex flex-row h-full divide-x divide-cyan-800">
      <div className="w-[250px] hidden md:flex flex-col p-2">
        <div className="flex flex-col gap-y-2 w-full divide-y divide-cyan-800">
          <div className="flex flex-col w-full py-3">
            {subCategories.map((category, index) => {
              if (index < 2) {
                return (
                  <Subcategory
                    key={category.label}
                    label={category.label}
                    icon={category.icon}
                  />
                );
              }
            })}
          </div>

          <div>
            <Dialog>
              <DialogTrigger className="flex flex-row gap-2 items-center w-full px-5 rounded-md text-md hover:bg-lightbackground py-2 mt-2 group hover:text-zinc-400 transition duration-500">
                <MdOutlineNewLabel
                  size={30}
                  className="text-lightbackground group-hover:text-darkbackground transition "
                />{" "}
                Create Reminder
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center py-2">Login</DialogTitle>
                  <DialogDescription>
                    <LoginForm />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Category category="My Reminders" />
        </div>
      </div>
      <main className="h-full flex-1 bg-background ">{children}</main>
    </div>
  );
};

export default Sidebar;
