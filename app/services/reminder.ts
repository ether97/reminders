import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Reminder } from "@prisma/client";

const BASE_URL = "http://localhost:3000/api/reminders";

export const reminderApi = createApi({
  reducerPath: "reminderApi",
  tagTypes: ["Reminders"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getReminders: builder.query<Partial<Reminder>[] | [], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Reminders"],
    }),
    addReminder: builder.mutation<Reminder, Partial<Reminder>>({
      query: ({ ...reminder }) => ({
        url: "/",
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
        url: `/${reminderId}`,
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
    updateReminder: builder.mutation<
      Reminder,
      Pick<Reminder, "id"> & Partial<Reminder>
    >({
      query: ({ id: reminderId, ...reminder }) => ({
        url: `/${reminderId}`,
        method: "PATCH",
        body: reminder,
      }),
      async onQueryStarted({ id, ...reminder }, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (draft: Partial<Reminder>[]) => {
              draft = draft.map((oldReminder) => {
                if (oldReminder.id === id) {
                  return reminder;
                } else {
                  return oldReminder;
                }
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetRemindersQuery,
  useAddReminderMutation,
  useDeleteReminderMutation,
  useUpdateReminderMutation
} = reminderApi;
