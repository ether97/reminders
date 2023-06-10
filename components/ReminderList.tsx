"use client";

import { Reminder } from "@prisma/client";
import Subcategory from "./Subcategory";
import ReminderComponent from "./Reminder";
import { RiFilePaper2Line } from "react-icons/ri";
import { experimental_useOptimistic as useOptimistic } from "react";

const ReminderList: React.FC<{ reminders: Reminder[] | null }> = ({
  reminders,
}) => {
  const [optimisticReminders, addOptimisticReminders] = useOptimistic(
    reminders
    // (state, reminderId) => state?.filter((item) => item.id !== reminderId)
  );
  return (
    <div className="flex flex-col w-full h-fit">
      <Subcategory label="My Reminders" icon={RiFilePaper2Line} inverted />
      {reminders?.map((reminder) => (
        <ReminderComponent
          key={reminder.title}
          label={reminder.title!}
          priority={reminder.priority!}
          id={reminder.id!}
        />
      ))}
    </div>
  );
};

export default ReminderList;
