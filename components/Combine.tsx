"use client";

import { Reminder } from "@/app/types/types";
import { VscCombine } from "react-icons/vsc";

import {
  useCombineRemindersMutation,
  useDeleteReminderByTitleMutation,
} from "@/app/services/reminder";
import { toast } from "react-hot-toast";
import { Row, RowModel } from "@tanstack/table-core";

const Combine: React.FC<{
  flatRows: Row<
    Pick<
      Reminder,
      "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
    >
  >[];
}> = ({ flatRows }) => {
  const data = flatRows.map((item) => {
    return item.original;
  });
  const copy = [...data];
  const [combineReminders] = useCombineRemindersMutation();
  const [deleteRemindersByTitle] = useDeleteReminderByTitleMutation();

  const deleteAll = async (
    data: Pick<Reminder, "title" | "date" | "time" | "priority" | "id">[]
  ) => {
    for (let i = 0; i < data.length; i++) {
      deleteRemindersByTitle(data[i].title);
    }
  };

  return (
    <VscCombine
      size={24}
      className="cursor-pointer text-orange-600"
      onClick={() => {
        Promise.all([combineReminders(data), deleteAll(data)])
          .then(() => {
            toast.success("Reminders combined!");
          })
          .catch(() => {
            toast.error("Couldnt combined reminders!");
          });
      }}
    />
  );
};

export default Combine;
