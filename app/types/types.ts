import { IconType } from "react-icons/lib";

export interface IChildren {
  children: React.ReactNode;
}

export type SubCategories = {
  category?: string;
  label: string;
  icon: IconType;
};
