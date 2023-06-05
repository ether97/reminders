"use client";

import { SubCategories } from "../app/types/types";
import Subcategory from "./Subcategory";
import React from "react";

interface CategoryProps {
  category?: string | React.ReactElement;
  subCategory?: SubCategories;
  onClick?: () => void;
}

const Category: React.FC<CategoryProps> = ({
  subCategory,
  category: Category,
}) => {
  return (
    <div className="flex flex-col w-full py-4 px-5">
      {Category && <h1>{Category}</h1>}
      {subCategory && (
        <Subcategory
          key={subCategory.label}
          icon={subCategory.icon}
          label={subCategory.label}
        />
      )}
    </div>
  );
};

export default Category;
