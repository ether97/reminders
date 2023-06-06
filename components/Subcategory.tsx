"use client";

import { IconType } from "react-icons";

import axios from "axios";

import { toast } from "react-hot-toast";
import { Reminder } from "@prisma/client";
import { Priority } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { MouseEventHandler } from "react";

interface SubcategoryProps {
  icon: IconType;
  label: string;
  inverted?: boolean;
  onClick: (label: string) => void;
}

const Subcategory: React.FC<SubcategoryProps> = ({
  icon: Icon,
  label,
  inverted,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-row gap-3 items-center w-full px-5 rounded-md text-md 
      ${
        !inverted
          ? "hover:bg-lightbackground hover:text-zinc-400 transition duration-500 cursor-pointer"
          : "bg-lightbackground gap-[30px]"
      } py-1 my-2 group`}
      onClick={() => onClick(label)}
    >
      <Icon
        size={30}
        className={`text-lightbackground ${
          !inverted
            ? "group-hover:text-darkbackground transition"
            : "text-darkbackground"
        }  `}
      />
      <p
        className={`w-full text-md
      ${!inverted ? "hover:text-zinc-400 transition" : ""}
       text-white`}
      >
        {label}
      </p>
    </div>
  );
};

export default Subcategory;
