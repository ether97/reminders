"use client";

import * as z from "zod";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Reminder } from "@prisma/client";

import { Textarea } from "./ui/textarea";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "./ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import TimePicker from "react-time-picker";
import { addReminder } from "@/app/actions/addReminder";

export type ReminderFormSchemaType = z.infer<typeof reminderFormSchema>;

export const reminderFormSchema = z.object({
  title: z.string().min(1, { message: "Title required!" }),
  description: z.string().max(160),
  recurringDigit: z.string().nullable(),
  recurringString: z.string().nullable(),
  priority: z.string(),
  date: z.date(),
  time: z.string(),
});

const CreateReminder = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  const form = useForm<ReminderFormSchemaType>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      title: "",
      description: "",
      recurringDigit: "",
      recurringString: "",
      priority: "High",
      date: new Date(),
      time: "",
    },
  });

  async function onSubmit(data: ReminderFormSchemaType) {
    let reminder: Reminder | null;
    reminder = await addReminder({ ...data });
    if (reminder) {
      toast.success("Reminder added!");
    }
    console.log(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col w-full"
    >
      <div className="flex flex-col gap-y-3 my-2">
        <Label htmlFor="Title">Title: </Label>

        <Input
          type="text"
          id="Title"
          placeholder="Enter title..."
          {...form.register("title")}
        />
      </div>
      <div className="flex flex-col gap-y-3 my-2">
        <Label htmlFor="Description">Description: </Label>
        <Textarea {...form.register("description")} />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Will this reminder repeat?</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-row items-center justify-between w-full gap-x-3 my-2">
              <Label>Remind me every: </Label>
              <select
                {...form.register("recurringDigit")}
                className="flex-1 h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <option
                    key={item}
                    value={0 || item}
                    className="bg-background h-[10px] cursor-pointer transition hover:bg-white hover:text-black"
                  >
                    {item}
                  </option>
                ))}
              </select>
              <select
                {...form.register("recurringString")}
                className="flex-1 h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {["Minute(s)", "Hour(s)", "Day(s)"].map((item) => (
                  <option
                    key={item}
                    value={"" || item}
                    className="bg-background h-[10px] cursor-pointer transition hover:bg-white hover:text-black"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-row gap-x-3 my-2 items-center">
        <Label htmlFor="priority">Priority: </Label>
        <select
          {...form.register("priority")}
          className="flex-1 h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {["High", "Medium", "Low"].map((item) => (
            <option
              key={item}
              value={item}
              className="bg-background h-[10px] cursor-pointer transition hover:bg-white hover:text-black"
            >
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 items-center w-fit mx-auto">
        {/* <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          {...form.register("date")}
          className="rounded-md border"
        /> */}
        <Input type="time" id="time" {...form.register("time")} />
      </div>
      <Button type="submit" className="bg-lightbackground my-2">
        Create
      </Button>
    </form>
  );
};

export default CreateReminder;
