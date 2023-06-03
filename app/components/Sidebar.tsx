"use client";

import { IChildren } from "../types/types";
import Category from "./Category";
import { MdOutlineNewLabel } from "react-icons/md";

const subCategories = [
  {
    label: "Reminder",
    icon: MdOutlineNewLabel,
  },
];

const Sidebar: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="flex flex-row h-full">
      <div
        className="
      w-[300px]
      hidden
      md:flex
      flex-col
      p-2
      bg-black
      "
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Category subCategories={subCategories} />
          <Category />
        </div>
      </div>
      <main className="h-full flex-1 bg-neutral-800">{children}</main>
    </div>
  );
};

export default Sidebar;
