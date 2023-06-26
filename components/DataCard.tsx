"use client";

import { useDeleteReminderByTitleMutation } from "@/app/services/reminder";
import { Reminder } from "@/app/types/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPenFill } from "react-icons/bs";

const DataCard: React.FC<{
  item: Pick<
    Reminder,
    "time" | "title" | "date" | "priority" | "id" | "categoryTitle"
  >;
}> = ({ item }) => {
  const [deleteReminder] = useDeleteReminderByTitleMutation();
  const handleClick = () => {
    deleteReminder(item.title).catch(() => {
      toast.error("Couldnt delete reminder!");
    });
  };

  return (
    <Card
      key={item.title}
      className={`w-full border-none my-2 
              ${
                item.priority === "High"
                  ? "bg-gradient-to-br from-rose-800"
                  : item.priority === "Medium"
                  ? "bg-gradient-to-br from-orange-600"
                  : item.priority === "Low"
                  ? "bg-gradient-to-br from-green-700"
                  : ""
              }
                `}
    >
      <CardHeader>
        <CardTitle className="flex flex-row justify-between w-full">
          {item.title}
          <div className="flex flex-row gap-2 items-center">
            <BsPenFill
              size={16}
              className="text-white cursor-pointer hover:scale-125 transition duration-300 ease-in-out"
            />
            <AiOutlineCloseCircle
              onClick={handleClick}
              size={20}
              className=" cursor-pointer  text-rose-600 hover:scale-125 transition duration-200 hover:rotate-180"
            />
          </div>
        </CardTitle>
        <CardDescription>{item.categoryTitle ?? ""}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>description</p>
      </CardContent>
      <CardFooter>
        <p>{item.date}</p>
      </CardFooter>
    </Card>
  );
};

export default DataCard;
