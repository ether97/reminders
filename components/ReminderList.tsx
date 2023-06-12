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
    content.push(<p>Loading...</p>);
  } else if (data) {
    content.push(
      <div className="flex flex-col w-full h-fit">
        <Subcategory label="My Reminders" icon={RiFilePaper2Line} inverted />
        {data.map((reminder) => (
          <ReminderComponent
            key={reminder.title}
            label={reminder.title!}
            priority={reminder.priority!}
            id={reminder.id!}
          />
        ))}
      </div>
    );
  } else if (error) {
    content.push(<p>Error loading reminders...</p>);
  }

  return content;
};

export default ReminderList;
