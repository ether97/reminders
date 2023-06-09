"use client";

import Subcategory from "./Subcategory";
import ReminderComponent from "./Reminder";
import { RiFilePaper2Line } from "react-icons/ri";
import { useGetRemindersQuery } from "@/app/services/reminder";

const ReminderList = () => {
  const { data, isLoading, error } = useGetRemindersQuery();
  console.log(data);

  let content = [];

  if (isLoading) {
    content.push(
      <p className="text-center animate-pulse text-zinc-400 text-[20px]">
        Loading...
      </p>
    );
  } else if (data) {
    content.push(
      <div className="flex flex-col w-full h-fit">
        {data.map((reminder) => {
          if (reminder.date !== "Expired" && !reminder.categoryTitle) {
            return (
              <ReminderComponent
                key={reminder.title}
                label={reminder.title}
                priority={reminder.priority}
                title={reminder.title}
              />
            );
          }
        })}
      </div>
    );
  } else if (error) {
    content.push(<p>Error loading reminders...</p>);
  }

  return content;
};

export default ReminderList;
