"use client";

import { useDeleteAllMutation } from "@/app/services/reminder";
import { toast } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const DeleteAll = () => {
  const [deleteAll] = useDeleteAllMutation();
  return (
    <FaTrashAlt
      size={24}
      className="text-rose-800 cursor-pointer"
      onClick={() => {
        deleteAll().then(() => {
          toast.success("All deadlines removed!");
        });
      }}
    />
  );
};

export default DeleteAll;
