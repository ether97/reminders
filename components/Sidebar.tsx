"use client";

import { User } from "@prisma/client";
import { IChildren, SubCategories } from "../app/types/types";
import Category from "./Category";
import { MdOutlineNewLabel } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { FaUser, FaUserCheck, FaUserPlus } from "react-icons/fa";

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
import { useState } from "react";
import { Button } from "./ui/button";

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
  const [modal, setModal] = useState<null | string>(null);

  const handleClick = (label: string) => {
    setModal(label);
  };

  return (
    <div className="flex flex-row h-full divide-x divide-cyan-800">
      <div className="w-[250px] hidden md:flex flex-col p-2">
        <div className="flex flex-col gap-y-1 w-full divide-y divide-cyan-800">
          <Dialog>
            <DialogTrigger className="flex flex-col">
              <Subcategory
                label="Login"
                icon={FaUserCheck}
                onClick={handleClick}
              />
              <Subcategory
                label="Register"
                icon={FaUserPlus}
                onClick={handleClick}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center py-2">{modal}</DialogTitle>
                <DialogDescription>
                  {modal === "Login" ? <LoginForm /> : <Button />}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div>
            <Dialog>
              <DialogTrigger className="w-full">
                <Subcategory
                  icon={MdOutlineNewLabel}
                  label="Create Reminder"
                  onClick={handleClick}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center py-2">
                    {modal}
                  </DialogTitle>
                  <DialogDescription>Reminder Form Here</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col w-full">
            <Subcategory
              label="My Reminders"
              icon={RiFilePaper2Line}
              inverted={true}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <main className="h-full flex-1 bg-background ">{children}</main>
    </div>
  );
};

export default Sidebar;
