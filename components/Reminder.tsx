"use client";

import { useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDeleteReminderMutation } from "@/app/services/app";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ReminderComponent: React.FC<{
  label: string;
  priority: string;
  id: string;
}> = ({ label, priority, id: reminderId }) => {
  const [deleteReminder] = useDeleteReminderMutation();
  const router = useRouter();
  const [effect, setEffect] = useState(false);

  const handleClick = async () => {
    deleteReminder(reminderId);
  };

  return (
    <div
      className={`${
        priority === "High"
          ? "bg-gradient-to-l from-rose-800"
          : priority === "Medium"
          ? "bg-gradient-to-l from-orange-600"
          : priority === "Low"
          ? "bg-gradient-to-l from-green-700"
          : ""
      }
      ${effect && "animate-slide"}
      relative flex-row gap-3 items-center w-full  rounded-md text-md py-1 px-4 my-2 
    `}
      onAnimationEnd={() => setEffect(false)}
    >
      <p className="text-md text-start truncate w-5/6">{label}</p>
      <AiOutlineCloseCircle
        onClick={handleClick}
        size={20}
        className="absolute right-[10px] cursor-pointer top-[6px] hover:scale-125 transition duration-200 hover:rotate-180"
      />
    </div>
  );
};

export default ReminderComponent;
