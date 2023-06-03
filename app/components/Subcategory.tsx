"use client";

import { IconType } from "react-icons";

interface SubcategoryProps {
  icon: IconType;
  label: string;
}

const Subcategory: React.FC<SubcategoryProps> = ({ icon: Icon, label }) => {
  return (
    <div className="inline-flex gap-x-2 p-2">
      <Icon size={24} className="text-white" />
      <p className="w-full text-md font-md hover:text-white transition text-zinc-400">
        {label}
      </p>
    </div>
  );
};

export default Subcategory;
