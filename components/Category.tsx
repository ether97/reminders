"use client";

import { SubCategories } from "../app/types/types";
import Subcategory from "./Subcategory";
import React from "react";

interface CategoryProps {
  category: string | React.ReactElement;
  subCategories?: SubCategories[];
  onClick?: () => void;
}

const Category: React.FC<CategoryProps> = ({
  subCategories,
  category: Category,
}) => {
  return (
    <div className="flex flex-col w-full py-4 px-5">
      <h1>{Category}</h1>
      {subCategories?.map((subcategory) => (
        <Subcategory
          key={subcategory.label}
          icon={subcategory.icon}
          label={subcategory.label}
        />
      ))}
    </div>
  );
};

export default Category;
