import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category, Reminder } from "../types/types";
import { User } from "@prisma/client";

const BASE_URL = "http://localhost:3000/api/categories";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[] | [], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation<Category, Category>({
      query: ({ ...category }) => ({
        url: "/",
        method: "POST",
        body: category,
      }),
      async onQueryStarted({ ...category }, { dispatch, queryFulfilled }) {
        const addCategory = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
            undefined,
            (draft: Category[]) => {
              if (category) {
                draft.push(category);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          addCategory.undo();
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;
