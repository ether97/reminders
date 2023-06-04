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
  const handleClick = async () => {
    const response = await axios.post<Reminder>("/api/reminders", {
      title: "handle Atmaja",
      description: "shes throwing a tantrum",
      recurring: true,
      priority: Priority.HIGH,
      recurringFreq: 1,
    });

    if (response.status === 200) {
      toast.success("reminder added!");
    } else {
      toast.error("error adding reminder!");
    }
  };

  return (
    <div
      className="inline-flex gap-x-2 p-2 cursor-pointer "
      onClick={handleClick}
    >
      <Icon size={24} className="text-white" />
      <p className="w-full text-md font-md hover:text-white transition text-zinc-400">
        {label}
      </p>
    </div>
  );
};

export default Subcategory;
