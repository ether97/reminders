"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Reminder } from "@/app/types/types";

import { MoreHorizontal } from "lucide-react";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { BiArrowToRight, BiArrowToBottom, BiArrowToTop } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscCombine } from "react-icons/vsc";
import axios from "axios";
import Modal from "../Modal";
import { useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import { useDeleteReminderByIdMutation } from "@/app/services/reminder";
import EditReminder from "../EditReminder";
import Combine from "../Combine";
import DeleteAll from "../DeleteAll";
import { AiOutlineStop } from "react-icons/ai";
import DeleteReminder from "../DeleteReminder";
import { priorities } from "./data/data";

const formatTime = (time: string): string => {
  let firstTwo = Number(time.slice(0, 2));
  let end = time.slice(1, time.length);
  if (firstTwo <= 12) {
    if (firstTwo < 10) {
      let removedFirst = time.slice(1, time.length);
      return `${removedFirst} AM`;
    }
    return `${time} AM`;
  } else {
    firstTwo -= 12;
    return `${firstTwo + end} PM`;
  }
  return "";
};

export const columns: ColumnDef<
  Pick<Reminder, "title" | "date" | "time" | "priority" | "id">
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex flex-row gap-1 items-center justify-center min-w-[50px]">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
        {(table.getIsSomeRowsSelected() ||
          table.getIsAllPageRowsSelected()) && <DeleteAll />}
        {(table.getIsSomeRowsSelected() ||
          table.getIsAllPageRowsSelected()) && (
          <Combine flatRows={table.getSelectedRowModel().flatRows} />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "Deadline",
    accessorFn: (row) => {
      if (row.date === "Expired") {
        return "Expired";
      }
      const sub = new Date(row.date).toUTCString().substring(0, 17);
      console.log("sub: ", sub);
      return `${row.date ? sub : ""} ${row.time ? formatTime(row.time) : ""}`;
    },
    sortingFn: "myDeadlineSorting",
  },
  // {
  //   accessorKey: "priority",
  //   header: "Priority",
  // },
  {
    id: "Priority",
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-lightbackground transition duration-100"
        >
          Priority
          {column.getIsSorted() === "asc" ? (
            <BiArrowToTop size={24} />
          ) : column.getIsSorted() === "desc" ? (
            <BiArrowToBottom size={24} />
          ) : (
            <BiArrowToRight size={24} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("Priority")
      );
      console.log(row.getValue("Priority"));
      if (!priority) return null;

      return (
        <div className="flex items-center w-full justify-center">
          <span>{priority.label}</span>
          {priority.icon && <priority.icon size={24} />}
        </div>
      );
    },
    sortingFn: "myCustomSorting",
  },
  {
    id: "Delete",
    header: "Delete",
    cell: ({ row }) => {
      return <DeleteReminder data={row.original} />;
    },
  },
  {
    id: "Edit",
    header: "Edit",
    cell: ({ row }) => {
      if (row.original.date === "Expired") {
        return (
          <div className="flex flex-row items-center justify-center w-full ">
            <AiOutlineStop size={20} className="text-black" />
          </div>
        );
      }
      console.log("row: ", row.original);
      return <EditReminder currentData={row.original} />;
    },
  },
];
