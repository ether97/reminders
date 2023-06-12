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
import DropdownActions from "./DropdownActions";
import { useDeleteReminderByIdMutation } from "@/app/services/reminder";
import EditReminder from "../EditReminder";
import Combine from "../Combine";
import DeleteAll from "../DeleteAll";

const formatTime = (time: string): string => {
  let firstTwo = Number(time.slice(0, 2));
  if (firstTwo <= 12) {
    let removedFirst = time.slice(1, time.length);
    return `${removedFirst} AM`;
  } else {
    firstTwo -= 12;
    return `${time} PM`;
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
        {table.getIsAllPageRowsSelected() && <DeleteAll />}
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
    accessorFn: (row) =>
      `${row.date ? new Date(row.date).toLocaleDateString() : ""} ${
        row.time ? formatTime(row.time) : ""
      }`,
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
    sortingFn: "myCustomSorting",
  },
  {
    id: "Delete",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center justify-center cursor-pointer">
          <FaTrashAlt
            size={20}
            className="text-rose-800 cursor-pointer hover:scale-125 transition duration-300 ease-in-out"
          />
        </div>
      );
    },
  },
  {
    id: "Edit",
    header: "Edit",
    cell: ({ row }) => {
      return <EditReminder currentData={row.original} />;
    },
  },
];
