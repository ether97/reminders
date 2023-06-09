"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CreateReminder from "./CreateReminder";
import EditReminder from "./EditReminder";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Subcategory from "./Subcategory";
import { Button } from "./ui/button";
import { Reminder, User } from "@prisma/client";

import { IconType } from "react-icons";
import { BsPenFill } from "react-icons/bs";
import getCurrentUser from "@/app/actions/getCurrentUser";

const labels = ["Login", "Register", "Create Reminder"];

const Modal: React.FC<{
  label: string | undefined;
  icon?: IconType | null;
  data?: Partial<Reminder & { recurring: boolean }>;
  currentUser?: User | null;
  disabled?: boolean;
}> = ({ label, icon, data, currentUser, disabled }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`${label && labels.includes(label) ? "w-full" : ""}`}
        disabled={disabled}
      >
        {label && labels?.includes(label) ? (
          <Subcategory
            label={label}
            icon={icon}
            className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
            inverted={disabled ? true : false}
          />
        ) : (
          <BsPenFill size={24} className="text-white" />
        )}
      </DialogTrigger>
      <DialogContent className="relative">
        <DialogHeader>
          <DialogTitle className="text-center py-2">{label}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {label === "Login" ? (
          <LoginForm />
        ) : label === "Register" ? (
          <RegisterForm />
        ) : label === "Create Reminder" && !currentUser ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="login">
              <AccordionTrigger>
                <p className="text-center text-zinc-400 font-light">
                  Log in to continue...
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <LoginForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : label === "Create Reminder" && currentUser ? (
          <CreateReminder />
        ) : (
          <EditReminder currentData={data} />
        )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
