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

export type FormSchemaType = z.infer<typeof formSchema>;

export const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
});
