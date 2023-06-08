"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Reminder } from "@prisma/client";

import { Row } from "@tanstack/react-table";

import { BiDotsHorizontalRounded } from "react-icons/bi";

const DropdownActions: React.FC<{
  data: Partial<Reminder & { recurring: boolean }>;
}> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsHorizontalRounded size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-lightbackground">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownActions;
