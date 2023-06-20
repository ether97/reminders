import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@prisma/client";
const BASE_URL = "http://localhost:3000/api";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    registerUser: builder.mutation<void, User>({
      query: ({ ...user }) => ({
        url: "/register",
        method: "POST",
      }),
      async onQueryStarted({ ...user }, { dispatch, queryFulfilled }) {
        const addUser = dispatch(
          userApi.util.updateQueryData("getUser", undefined, (draft: User) => {
            if (user) {
              draft = user;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          addUser.undo();
        }
      },
    }),
  }),
});
