import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { reminderApi } from "./app";

export const store = configureStore({
  reducer: {
    [reminderApi.reducerPath]: reminderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reminderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
