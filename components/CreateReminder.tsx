"use client";

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
import { useAddReminderMutation } from "@/app/services/reminder";
import Subcategory from "./Subcategory";
import { FaUserCheck } from "react-icons/fa";

import { ReminderFormSchemaType } from "@/app/schemas/schemas";
import { reminderFormSchema } from "@/app/schemas/schemas";
import { User } from "@prisma/client";

const CreateReminder: React.FC<{
  disabled?: boolean;
  currentUser?: User | null;
}> = ({ disabled, currentUser }) => {
  const [addReminder, response] = useAddReminderMutation();
  const [date, setDate] = useState<any>(new Date());
  const form = useForm<ReminderFormSchemaType>({
    resolver: zodResolver(reminderFormSchema),
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="mb-2 text-center text-white">
            Create Reminder
          </DialogTitle>
          <DialogDescription>
            {!currentUser ? (
              <p className="text-center my-3 text-[20px] text-zinc-400">
                Log in to create reminders...{" "}
              </p>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full color-white"
              >
                <div className="flex flex-col gap-y-3 my-2">
                  <Label htmlFor="Title" className="text-white">
                    Title:{" "}
                  </Label>

                  <Input
                    type="text"
                    id="Title"
                    placeholder="Enter title..."
                    {...form.register("title")}
                  />
                </div>
                <div className="flex flex-col gap-y-3 my-2 text-white">
                  <Label htmlFor="Description">Description: </Label>
                  <Textarea {...form.register("description")} />
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full text-white"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>When is the deadline?</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 items-center w-fit mx-auto">
                        <Input
                          type="date"
                          onSelect={setDate}
                          defaultValue={date}
                          {...form.register("date")}
                        />
                        <Input
                          type="time"
                          id="time"
                          {...form.register("time")}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-row gap-x-3 my-2 items-center">
                  <Label htmlFor="priority" className="text-white">
                    Priority:{" "}
                  </Label>
                  <select
                    {...form.register("priority")}
                    className="text-white flex-1 h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {["High", "Medium", "Low"].map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="bg-background h-[10px] cursor-pointer transition hover:bg-white text-white hover:text-black"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  className="bg-lightbackground my-2 text-white"
                >
                  Create
                </Button>
              </form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
