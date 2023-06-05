import { create } from "zustand";

interface ReminderModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const createReminder = create<ReminderModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default createReminder;
