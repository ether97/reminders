"use client";

import * as z from "zod";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./ui/button";

import { Textarea } from "./ui/textarea";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import toast from "react-hot-toast";
import { Label } from "./ui/label";
import { Reminder } from "@/app/types/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { editReminderFormSchema } from "@/app/schemas/schemas";
import { EditReminderFormSchemaType } from "@/app/schemas/schemas";
import { useUpdateReminderMutation } from "@/app/services/reminder";
import { BsPenFill } from "react-icons/bs";
import { useState } from "react";
import SheetParent from "./SheetParent";

const EditReminder: React.FC<{
  currentData: Pick<
    Reminder,
    "title" | "date" | "time" | "priority" | "id" | "description"
  >;
  mobile?: boolean;
}> = ({ currentData, mobile }) => {
  const [date, setDate] = useState<any>(null);
  const [dateCheck, setDateCheck] = useState(true);
  const [updateReminder] = useUpdateReminderMutation();
  const form = useForm<EditReminderFormSchemaType>({
    resolver: zodResolver(editReminderFormSchema),
    defaultValues: {
      title: currentData.title.substring(0, 20) || "",
      description: currentData.description?.substring(0, 150) || "",
      priority: currentData.priority || "High",
      date: currentData.date || "",
      time: currentData.time || "",
    },
  });

  async function onSubmit(data: EditReminderFormSchemaType) {
    console.log(currentData.title);
    document.getElementById("closeDialog")?.click();

    updateReminder({ reminderTitle: currentData.title, ...data }).catch(() =>
      toast.error("Couldnt update reminder!")
    );
  }

  if (mobile) {
    return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
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
        <div className="flex flex-col gap-y-3 my-2">
          <Label htmlFor="Description">Description: </Label>
          <Textarea {...form.register("description")} />
        </div>
        <div className="flex flex-row gap-5 my-2 w-full">
          <div className="flex flex-row gap-x-2 items-center">
            <Label htmlFor="date" className="text-white">
              Date:{" "}
            </Label>
            <Input
              type="date"
              onSelect={setDate}
              min={new Date().toISOString().split("T")[0]}
              // defaultValue={date}
              {...form.register("date")}
              className={`focus:outline-none ${
                !dateCheck ? "border-rose-600 text-rose-600" : ""
              }`}
              onClick={() => setDateCheck(true)}
            />
          </div>
          <div className="flex flex-row gap-x-2 items-center flex-1">
            <Label htmlFor="time" className="text-white">
              Time:{" "}
            </Label>
            <Input
              type="time"
              id="time"
              {...form.register("time")}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-3 my-2 items-center">
          <Label htmlFor="priority" className="text-white">
            Priority:{" "}
          </Label>
          <select
            {...form.register("priority")}
            className="flex-1 text-white h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {["High", "Medium", "Low"].map((item) => (
              <option
                key={item}
                value={item}
                className="bg-background h-[10px] cursor-pointer transition hover:bg-white hover:text-black text-white"
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="bg-lightbackground my-2">
          Edit
        </Button>
      </form>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="flex flex-row items-center justify-center w-full ">
        <BsPenFill
          size={20}
          className="text-green-500 hover:scale-125 transition duration-300 ease-in-out"
        />
      </DialogTrigger>
      <DialogContent className="relative">
        <DialogHeader>
          <DialogTitle className="text-center py-2 text-white">
            {currentData.title}
          </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full"
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
              <div className="flex flex-col gap-y-3 my-2">
                <Label htmlFor="Description">Description: </Label>
                <Textarea {...form.register("description")} />
              </div>
              <div className="flex flex-row gap-5 my-2 w-full">
                <div className="flex flex-row gap-x-2 items-center">
                  <Label htmlFor="date" className="text-white">
                    Date:{" "}
                  </Label>
                  <Input
                    type="date"
                    onSelect={setDate}
                    min={new Date().toISOString().split("T")[0]}
                    // defaultValue={date}
                    {...form.register("date")}
                    className={`focus:outline-none ${
                      !dateCheck ? "border-rose-600 text-rose-600" : ""
                    }`}
                    onClick={() => setDateCheck(true)}
                  />
                </div>
                <div className="flex flex-row gap-x-2 items-center flex-1">
                  <Label htmlFor="time" className="text-white">
                    Time:{" "}
                  </Label>
                  <Input
                    type="time"
                    id="time"
                    {...form.register("time")}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-x-3 my-2 items-center">
                <Label htmlFor="priority" className="text-white">
                  Priority:{" "}
                </Label>
                <select
                  {...form.register("priority")}
                  className="flex-1 text-white h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {["High", "Medium", "Low"].map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-background h-[10px] cursor-pointer transition hover:bg-white hover:text-black text-white"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="bg-lightbackground my-2">
                Edit
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditReminder;
