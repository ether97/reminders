"use client";

import { useGetCategoriesQuery } from "@/app/services/category";
import Category from "./Category";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col gap-2">
      {categories?.map((categoryTitle) => (
        <Category key={categoryTitle} title={categoryTitle} />
      ))}
    </div>
  );
};

export default CategoryList;
