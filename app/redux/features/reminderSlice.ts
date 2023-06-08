import { Reminder } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReminderState {
  reminders: Reminder[];
}

const initialState: ReminderState = {
  reminders: [],
};

export const fetchReminders = createAsyncThunk("getReminders", async () => {
  const response = await "http://localhost:3000/api/reminders";
});

export const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    setReminders: (state, action: PayloadAction<Reminder[]>) => {
      state.reminders = action.payload;
    },
    deleteReminder: (state, action: PayloadAction<string>) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id === action.payload
      );
    },
  },
});

export const { setReminders, deleteReminder } = reminderSlice.actions;

export default reminderSlice.reducer;
