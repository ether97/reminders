import { IconType } from "react-icons/lib";

export interface IChildren {
  children: React.ReactNode;
}

export type SubCategories = {
  category?: string;
  label: string;
  icon: IconType;
};

export type Reminder = {
  id?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  date?: string;
  time?: string;
  priority: string;
  title: string;
  description?: string;
};
