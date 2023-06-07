"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Reminder } from "@prisma/client";

import { MoreHorizontal } from "lucide-react";
import { IoIosArrowDropdown } from "react-icons/io";

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

export const columns: ColumnDef<Partial<Reminder & { recurring: boolean }>>[] =
  [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "recurring",
      header: "Recurring",
    },
    {
      id: "Every",
      accessorFn: (row) => `${row.recurringDigit} ${row.recurringString}`,
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      id: "Delete",
      header: "Delete",
      cell: ({ row }) => {
        const data = row.original || "";
        const reminderId = data.id;

        return (
          <Button
            onClick={() => {
              axios.delete(`/api/reminders/${reminderId}`).then(() => {
                location.reload();
              });
            }}
            className="bg-rose-800"
          >
            Delete
          </Button>
        );
      },
    },
    {
      id: "Edit",
      header: "Edit",
      cell: ({ row }) => {
        const data = row.original || "";

        return <Modal label={data.title} data={data} />;
      },
    },
  ];
