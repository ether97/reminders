import { Reminder } from "@prisma/client";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiSlice } from "./api/apiSlice";

const remindersAdapter = createEntityAdapter({
  sortComparer: (a: Reminder, b: Reminder) =>
    b.date!.getTime() > a.date!.getTime() ? 1 : -1,
});

const initialState = remindersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReminders: builder.query<Reminder[], void>({
      query: () => "/reminders",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Reminder" as const, id })),
              { type: "Reminder", id: "LIST" },
            ]
          : [{ type: "Reminder", id: "LIST" }],
    }),
  }),
});

export const { useGetRemindersQuery } = extendedApiSlice;

export const selectRemindersResult =
  extendedApiSlice.endpoints.getReminders.select(); //result object, not the data

const selectRemindersData = createSelector(
  selectRemindersResult,
  (remindersResult) => remindersResult.data
);
