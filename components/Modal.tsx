"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import CreateReminder from "./CreateReminder";
import EditReminder from "./EditReminder";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Subcategory from "./Subcategory";
import { Button } from "./ui/button";
import { Reminder } from "@prisma/client";

import { IconType } from "react-icons";

const labels = ["Login", "Register", "Create Reminder"];

const Modal: React.FC<{
  label: string | undefined;
  icon?: IconType | null;
  data?: Partial<Reminder & {recurring: boolean}>
}> = ({ label, icon, data }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        {label && labels?.includes(label) ? (
          <Subcategory label={label} icon={icon} />
        ) : (
          <Button className="bg-lightbackground w-full">Edit</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center py-2">{label}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {label === "Login" ? (
          <LoginForm />
        ) : label === "Register" ? (
          <RegisterForm />
        ) : label === "Create Reminder" ? (
          <CreateReminder />
        ) : (
          <EditReminder currentData={data} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
