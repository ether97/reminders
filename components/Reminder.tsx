"use client";

import { useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDeleteReminderByTitleMutation } from "@/app/services/reminder";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ReminderComponent: React.FC<{
  label: string;
  priority: string;
  title: string;
}> = ({ label, priority, title: reminderTitle }) => {
  const [deleteReminder] = useDeleteReminderByTitleMutation();
  const [effect, setEffect] = useState(false);

  const handleClick = async () => {
    console.log(reminderTitle);
    deleteReminder(reminderTitle);
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
      relative flex-row gap-3 items-center w-full  rounded-md text-md px-4 my-2 py-1
    `}
      onAnimationEnd={() => setEffect(false)}
    >
      <p className="text-md text-white text-start truncate w-5/6">{label}</p>
      <AiOutlineCloseCircle
        onClick={handleClick}
        size={20}
        className="absolute right-[10px] cursor-pointer my-auto top-0 bottom-0  text-white hover:scale-125 transition duration-200 hover:rotate-180"
      />
    </div>
  );
};

export default ReminderComponent;
