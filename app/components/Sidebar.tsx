"use client";

import { User } from "@prisma/client";
import { IChildren } from "../types/types";
import Category from "./Category";
import { MdOutlineNewLabel } from "react-icons/md";

const subCategories = [
  {
    label: "Reminder",
    icon: MdOutlineNewLabel,
  },
];

const Sidebar: React.FC<IChildren & { currentUser: User | null }> = ({
  children,
  currentUser,
}) => {
  return (
    <div className="flex flex-row h-full divide-x divide-neutral-800">
      <div
        className="
        w-[250px]
        hidden
        md:flex
        flex-col
        p-2
        "
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Category category="Create" subCategories={subCategories} />
          <Category category="Reminders" />
        </div>
      </div>
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

export default Sidebar;
