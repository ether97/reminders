import { FaTrashAlt } from "react-icons/fa";

import { Reminder } from "@/app/types/types";
import { useDeleteReminderByTitleMutation } from "@/app/services/reminder";

const DeleteReminder: React.FC<{ data: Pick<Reminder, "title"> }> = ({
  data,
}) => {
  const [deleteReminder] = useDeleteReminderByTitleMutation();

  const handleDelete = () => {
    deleteReminder(data.title);
  };
  return (
    <div className="flex flex-row items-center justify-center cursor-pointer">
      <FaTrashAlt
        size={20}
        className="text-rose-800 cursor-pointer hover:scale-125 transition duration-300 ease-in-out"
      />
    </div>
  );
};

export default DeleteReminder;
