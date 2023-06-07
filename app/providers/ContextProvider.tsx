import { Reminder } from "@prisma/client";
import { createContext, useContext } from "react";
export type GlobalContent = {
  reminders: Reminder[];
  deleteReminder: (id: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  reminders: [],
  deleteReminder: (id) => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
