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

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Subcategory from "./Subcategory";
import { Button } from "./ui/button";

import { IconType } from "react-icons";

const Modal: React.FC<{ label: string; icon: IconType }> = ({
  label,
  icon,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Subcategory label={label} icon={icon} />
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
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
