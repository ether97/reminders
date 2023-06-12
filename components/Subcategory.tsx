"use client";

import { IconType } from "react-icons";

import axios from "axios";

import { toast } from "react-hot-toast";
import { Reminder } from "@/app/types/types";

import { twMerge } from "tailwind-merge";
import { MouseEventHandler } from "react";

interface SubcategoryProps {
  icon?: IconType | null;
  label: string | undefined;
  inverted?: boolean;
  onClick?: () => void;
  className?: string;
}

const Subcategory: React.FC<SubcategoryProps> = ({
  icon: Icon,
  label,
  inverted,
  onClick,
  className,
}) => {
  if (inverted) {
    return (
      <div
        className={twMerge(
          `flex flex-row gap-3 items-center w-full px-5 rounded-md text-md py-2 my-2 group bg-lightbackground`,
          className
        )}
      >
        {Icon && <Icon size={30} className={`text-darkbackground   `} />}
        <p className={`w-full text-md text-center text-white`}>{label}</p>
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      className={twMerge(
        ` ${
          label === "Create Reminder" ? "animate-enlarge" : "duration-500"
        } flex flex-row gap-3 items-center w-full px-5 rounded-md text-md hover:bg-lightbackground hover:text-zinc-400 transition cursor-pointer py-2 mt-2 mb-1 group`,
        className
      )}
    >
      {Icon && <Icon size={30} className={`  `} />}
      <p
        className={`w-full text-md text-center hover:text-zinc-400 transition text-white`}
      >
        {label}
      </p>
    </div>
  );
};

export default Subcategory;
