"use client";

import { SubCategories } from "../types/types";
import Subcategory from "./Subcategory";

interface CategoryProps {
  category: string;
  subCategories?: SubCategories[];
}

const Category: React.FC<CategoryProps> = ({ subCategories, category }) => {
  return (
    <div className="flex flex-col w-full py-4 px-5">
      <h1>{category}</h1>
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
