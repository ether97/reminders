import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category, Reminder } from "../types/types";
import { User } from "@prisma/client";

const BASE_URL = "http://localhost:3000/api/categories";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation<Category, string>({
      query: (title) => ({
        url: `/${title}`,
        method: "POST",
      }),
      async onQueryStarted(title, { dispatch, queryFulfilled }) {
        const addCategory = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
            undefined,
            (draft: string[]) => {
              if (title) {
                draft.push(title);
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
    deleteCategory: builder.mutation<string[], string>({
      query: (title) => ({
        url: `/${title}`,
        method: "DELETE",
      }),
      async onQueryStarted(title, { dispatch, queryFulfilled }) {
        const deleteCategory = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
            undefined,
            (draft: string[]) => {
              return draft.filter((categoryTitle) => categoryTitle !== title);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deleteCategory.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
