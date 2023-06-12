import * as z from "zod";

export type FormSchemaType = z.infer<typeof formSchema>;
export type ReminderFormSchemaType = z.infer<typeof reminderFormSchema>;
export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type EditReminderFormSchemaType = z.infer<typeof editReminderFormSchema>;

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

export const reminderFormSchema = z.object({
  title: z.string().min(1, { message: "Title required!" }),
  description: z.string().max(160),
  priority: z.string(),
  date: z.string(),
  time: z.string(),
});

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Name required!" }),
  email: z.string().email().min(1, { message: "Email required!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmPassword: z
    .string()
    .min(1, { message: "This field cannot be empty!" }),
});

export const editReminderFormSchema = z.object({
  title: z.string().min(1, { message: "Title required!" }),
  description: z.string().max(160),
  priority: z.string(),
  date: z.string(),
  time: z.string(),
});
