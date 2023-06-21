import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { reminderApi } from "./reminder";
import { categoryApi } from "./category";

export const store = configureStore({
  reducer: {
    [reminderApi.reducerPath]: reminderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reminderApi.middleware)
      .concat(categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
