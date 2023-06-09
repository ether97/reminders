"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Reminder } from "@prisma/client";

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
import axios from "axios";
import Modal from "../Modal";
import { useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import DropdownActions from "./DropdownActions";

export const columns: ColumnDef<Partial<Reminder & { recurring: boolean }>>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex flex-row gap-1 items-center justify-center min-w-[50px]">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
          {table.getIsAllPageRowsSelected() && (
            <FaTrashAlt
              size={24}
              className="text-rose-800 cursor-pointer"
              onClick={() => {
                axios.delete("/api/reminders").then((response) => {
                  toast.success(`All reminders removed for ${response.data}`);
                  location.reload();
                });
              }}
            />
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
        `${row.date ? row.date.toLocaleDateString() : ""} ${
          row.time ? row.time : ""
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
          <Button variant="outline">
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
      id: "Actions",
      header: "Actions",
      cell: ({ row }) => {
        const reminderId = row.original.id;
        return (
          <div className="flex flex-row gap-2 items-center justify-center">
            <Modal label="Edit" data={row.original} />
            <FaTrashAlt
              size={24}
              className="text-rose-800 cursor-pointer"
              onClick={() => {
                axios.delete(`/api/reminders/${reminderId}`).then(() => {
                  location.reload();
                });
              }}
            />
          </div>
        );
      },
    },
  ];
