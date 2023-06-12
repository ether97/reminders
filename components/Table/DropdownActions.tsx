"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Reminder } from "@/app/types/types";

import { Row } from "@tanstack/react-table";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import Modal from "../Modal";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteReminderByIdMutation } from "@/app/services/reminder";
import EditReminder from "../EditReminder";

const DropdownActions: React.FC<{
  data: Partial<Reminder>;
}> = ({ data }) => {
  const [deleteReminder] = useDeleteReminderByIdMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsHorizontalRounded size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-lightbackground">
        <DropdownMenuItem className="hover:bg-background transition duration-100 cursor-pointer">
          <EditReminder currentData={data} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-background transition duration-100 cursor-pointer"
          onClick={() => {
            if (data.id) {
              deleteReminder(data.id);
            }
          }}
        >
          <FaTrashAlt size={20} className="text-rose-800" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownActions;
