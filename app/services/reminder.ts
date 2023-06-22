import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Reminder } from "../types/types";
import { User } from "@prisma/client";
import { mongoObjectId } from "./../utils/mongodbID";

const BASE_URL = "http://localhost:3000/api/reminders";

export const reminderApi = createApi({
  reducerPath: "reminderApi",
  tagTypes: ["Reminders"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getReminders: builder.query<
      | Pick<
          Reminder,
          "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
        >[]
      | [],
      void
    >({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Reminders"],
      // transformResponse: (response: any) => {
      //   let newResponse = response.map((reminder: Reminder) => {
      //     if (
      //       new Date(reminder.date ?? "") < new Date(new Date().toDateString())
      //     ) {
      //       return { ...reminder, date: "Expired" };
      //     }
      //     return reminder;
      //   });

      //   return newResponse;
      // },
    }),
    deleteAll: builder.mutation<User, void>({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
      async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (
              draft: Pick<
                Reminder,
                "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
              >[]
            ) => {
              return [];
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          addResult.undo();
        }
      },
    }),
    addReminder: builder.mutation<
      Reminder,
      Pick<
        Reminder,
        "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
      >
    >({
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
            (
              draft: Pick<
                Reminder,
                "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
              >[]
            ) => {
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
    }),
    deleteReminderById: builder.mutation<Reminder, string>({
      query: (reminderId) => ({
        url: `/deleteId/${reminderId}`,
        method: "DELETE",
      }),
      async onQueryStarted(reminderId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (
              draft: Pick<
                Reminder,
                "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
              >[]
            ) => {
              return draft.filter((reminder) => reminder.id !== reminderId);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deleteResult.undo();
        }
      },
    }),
    deleteReminderByTitle: builder.mutation<User, string>({
      query: (reminderTitle) => ({
        url: `/deleteTitle/${reminderTitle}`,
        method: "DELETE",
      }),
      async onQueryStarted(reminderTitle, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (
              draft: Pick<
                Reminder,
                "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
              >[]
            ) => {
              return draft.filter((item) => item.title !== reminderTitle);
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
    combineReminders: builder.mutation<
      Reminder,
      Pick<
        Reminder,
        "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
      >[]
    >({
      query: ([...reminders]) => ({
        url: "/",
        method: "PUT",
        body: reminders,
      }),
      async onQueryStarted([...reminders], { dispatch, queryFulfilled }) {
        const combineResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (
              draft: Pick<
                Reminder,
                "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
              >[]
            ) => {
              const result = reminders.reduce((acc, reminder) => {
                const compareDates = (
                  acc: Pick<
                    Reminder,
                    | "title"
                    | "date"
                    | "time"
                    | "priority"
                    | "id"
                    | "categoryTitle"
                  >,
                  reminder: Pick<
                    Reminder,
                    | "title"
                    | "date"
                    | "time"
                    | "priority"
                    | "id"
                    | "categoryTitle"
                  >
                ) => {
                  if (!acc.date) {
                    return { id: reminder.id, date: reminder.date };
                  }
                  if (!reminder.date) {
                    return { id: acc.id, date: acc.date };
                  }
                  if (acc.date < reminder.date) {
                    return { id: acc.id, date: acc.date };
                  }
                  if (reminder.date < acc.date) {
                    return { id: reminder.id, date: reminder.date };
                  }
                  if (!acc.time) {
                    return {
                      id: reminder.id,
                      date: reminder.date,
                      time: reminder.time,
                    };
                  }
                  if (!reminder.time) {
                    return { id: acc.id, date: acc.date, time: acc.time };
                  }
                  if (new Date(acc.time) < new Date(reminder.time)) {
                    return { id: acc.id, date: acc.date, time: acc.time };
                  }
                  if (new Date(reminder.time) < new Date(acc.time)) {
                    return {
                      id: reminder.id,
                      date: reminder.date,
                      time: reminder.time,
                    };
                  }
                  return {
                    id: reminder.id,
                    date: reminder.date,
                    time: reminder.time,
                  };
                };
                const result = compareDates(reminder, acc);
                return {
                  ...acc,
                  title: `${reminder.title} ${acc.title}`,
                  date: reminder.date || result.date,
                  time: reminder.time || result.time,
                  priority: reminder.priority,
                };
              });
              draft.push(result);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          combineResult.undo();
        }
      },
    }),
    updateReminder: builder.mutation<
      Reminder,
      { reminderTitle: string } & Pick<
        Reminder,
        "id" | "title" | "date" | "time" | "priority" | "categoryTitle"
      >
    >({
      query: ({ reminderTitle, ...reminder }) => ({
        url: `/${reminderTitle}`,
        method: "PATCH",
        body: reminder,
      }),
      async onQueryStarted(
        { reminderTitle, ...reminder },
        { dispatch, queryFulfilled }
      ) {
        const updateResult = dispatch(
          reminderApi.util.updateQueryData(
            "getReminders",
            undefined,
            (
              draft: Pick<
                Reminder,
                "title" | "date" | "time" | "priority" | "id" | "categoryTitle"
              >[]
            ) => {
              const newDraft = draft.map((oldReminder) => {
                if (oldReminder.title === reminderTitle) {
                  console.log(reminder);
                  return reminder;
                } else {
                  return oldReminder;
                }
              });
              return newDraft;
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
  useDeleteReminderByIdMutation,
  useUpdateReminderMutation,
  useCombineRemindersMutation,
  useDeleteReminderByTitleMutation,
  useDeleteAllMutation,
} = reminderApi;
