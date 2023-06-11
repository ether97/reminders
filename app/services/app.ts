import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Reminder, User } from "@prisma/client";

const BASE_URL = "http://localhost:3000/api";

export const reminderApi = createApi({
  reducerPath: "reminderApi",
  tagTypes: ["Reminders", "Users"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getReminders: builder.query<Partial<Reminder>[] | [], void>({
      query: () => ({
        url: "/reminders",
        method: "GET",
      }),
      providesTags: ["Reminders"],
    }),
    addReminder: builder.mutation<Reminder, Partial<Reminder>>({
      query: ({ ...reminder }) => ({
        url: "/reminders",
        method: "POST",
        body: reminder,
      }),
      async onQueryStarted({ ...reminder }, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (draft: Partial<Reminder>[]) => {
              if (reminder) {
                draft.push(reminder);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          addResult.undo();
        }
      },
      invalidatesTags: ["Reminders"],
    }),
    deleteReminder: builder.mutation<Reminder, string>({
      query: (reminderId) => ({
        url: `/reminders/${reminderId}`,
        method: "DELETE",
      }),
      async onQueryStarted(reminderId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (draft: Partial<Reminder>[]) => {
              draft = draft.filter((reminder) => reminder.id === reminderId);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deleteResult.undo();
        }
      },
      invalidatesTags: ["Reminders"],
    }),
  }),
});

export const {
  useGetRemindersQuery,
  useAddReminderMutation,
  useDeleteReminderMutation,
} = reminderApi;
