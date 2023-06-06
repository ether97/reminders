import { IconType } from "react-icons/lib";

import * as z from "zod";

export interface IChildren {
  children: React.ReactNode;
}

export type SubCategories = {
  category?: string;
  label: string;
  icon: IconType;
};
