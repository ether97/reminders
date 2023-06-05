"use client";

import { IconType } from "react-icons";

import axios from "axios";

import { toast } from "react-hot-toast";
import { Reminder } from "@prisma/client";
import { Priority } from "@prisma/client";

interface SubcategoryProps {
  icon: IconType;
  label: string;
}

const Subcategory: React.FC<SubcategoryProps> = ({ icon: Icon, label }) => {
  // const handleClick = async () => {
  //   const response = await axios.post<Reminder>("/api/reminders", {
  //     title: "handle Atmaja",
  //     description: "shes throwing a tantrum",
  //     recurring: true,
  //     priority: Priority.HIGH,
  //     recurringFreq: 1,
  //   });

  //   if (response.status === 200) {
  //     toast.success("reminder added!");
  //   } else {
  //     toast.error("error adding reminder!");
  //   }
  // };

  return (
    <div
      className="flex flex-row gap-3 items-center w-full px-5 rounded-md text-md hover:bg-lightbackground py-1 group hover:text-zinc-400 transition duration-500 cursor-pointer"
      // onClick={handleClick}
    >
      <Icon
        size={30}
        className="text-lightbackground group-hover:text-darkbackground transition "
      />
      <p className="w-full text-md font-md hover:text-zinc-400 transition text-white">
        {label}
      </p>
    </div>
  );
};

export default Subcategory;
