"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { Textarea } from "./ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "./ui/label";
import { toast } from "react-hot-toast";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { useAddReminderMutation } from "@/app/services/app";
import Subcategory from "./Subcategory";
import { FaUserCheck } from "react-icons/fa";

export type ReminderFormSchemaType = z.infer<typeof reminderFormSchema>;

export const reminderFormSchema = z.object({
  title: z.string().min(1, { message: "Title required!" }),
  description: z.string().max(160),
  priority: z.string(),
  date: z.date(),
  time: z.string(),
});

const CreateReminder: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const [addReminder, response] = useAddReminderMutation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const form = useForm<ReminderFormSchemaType>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "High",
      date: new Date(),
      time: "",
    },
  });

  async function onSubmit(data: ReminderFormSchemaType) {
    addReminder(data)
      .unwrap()
      .then(() => {
        document.getElementById("closeDialog")?.click();
        toast.success("item added");
      })
      .catch(() => {
        toast.error("item not added!");
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Subcategory
          label="Create Reminder"
          icon={FaUserCheck}
          className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">
            Create Reminder
          </DialogTitle>
          <DialogDescription>
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
                  <AccordionTrigger>When is the deadline?</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-1 items-center w-fit mx-auto">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        {...form.register("date")}
                        className="rounded-md border"
                      />
                      <Input type="time" id="time" {...form.register("time")} />
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

              <Button type="submit" className="bg-lightbackground my-2">
                Create
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
