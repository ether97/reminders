"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";

const variants = {
  visible: { opacity: 1, x: 0, display: "block" },
  invisible: { opacity: 0, x: "-100%", display: "none" },
};

const ReminderComponent: React.FC<{
  label: string;
  priority: string;
  id: string;
}> = ({ label, priority, id }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClick = () => {
    setIsOpen((open) => !isOpen);
    axios.delete("/api/reminders", { data: id }).then(() => {});
  };

  return (
    <motion.div
      animate={isOpen ? "visible" : "invisible"}
      variants={variants}
      className={`${
        priority === "High"
          ? "bg-gradient-to-l from-rose-800"
          : priority === "Medium"
          ? "bg-gradient-to-l from-orange-600"
          : priority === "Low"
          ? "bg-gradient-to-l from-green-700"
          : ""
      }
      relative flex flex-row gap-3 items-center w-full  rounded-md text-md py-1 px-4 my-2 
    `}
    >
      <p className="text-md text-start truncate w-5/6">{label}</p>
      <AiOutlineCloseCircle
        onClick={handleClick}
        size={20}
        className="absolute right-[10px] cursor-pointer my-auto hover:scale-125 transition duration-200 hover:rotate-180"
      />
    </motion.div>
  );
};

export default ReminderComponent;
