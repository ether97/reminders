"use client";

import { IconType } from "react-icons";

import axios from "axios";

import { toast } from "react-hot-toast";
import { Reminder } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { MouseEventHandler } from "react";

interface SubcategoryProps {
  icon: IconType;
  label: string;
  inverted?: boolean;
  onClick?: () => void;
}

const Subcategory: React.FC<SubcategoryProps> = ({
  icon: Icon,
  label,
  inverted,
  onClick,
}) => {
  if (inverted) {
    return (
      <div
        className={`flex flex-row gap-3 items-center w-full px-5 rounded-md text-md py-1 my-2 group bg-lightbackground`}
      >
        <Icon size={30} className={`text-darkbackground   `} />
        <p className={`w-full text-md text-center text-white`}>{label}</p>
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      className={`flex flex-row gap-3 items-center w-full px-5 rounded-md text-md hover:bg-lightbackground hover:text-zinc-400 transition duration-500 cursor-pointer py-1 my-2 group`}
    >
      <Icon
        size={30}
        className={`text-lightbackground group-hover:text-darkbackground transition `}
      />
      <p
        className={`w-full text-md text-center hover:text-zinc-400 transition text-white`}
      >
        {label}
      </p>
    </div>
  );
};

export default Subcategory;
