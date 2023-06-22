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
import ErrorMessage from "./ErrorMessage";
import { useGetCategoriesQuery } from "@/app/services/category";
import { mongoObjectId } from "@/app/utils/mongodbID";

const CreateReminder: React.FC<{
  disabled?: boolean;
  currentUser?: User | null;
}> = ({ disabled, currentUser }) => {
  const [addReminder, response] = useAddReminderMutation();
  const { data: categories } = useGetCategoriesQuery();
  const [date, setDate] = useState<any>(null);
  const [dateCheck, setDateCheck] = useState(true);
  const [timeCheck, setTimeCheck] = useState(false);
  const form = useForm<ReminderFormSchemaType>({
    resolver: zodResolver(reminderFormSchema),
  });

  async function onSubmit(data: ReminderFormSchemaType) {
    console.log(data);
    const ID = mongoObjectId();
    addReminder({ id: ID, ...data })
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
                  {form.formState.errors.title && (
                    <ErrorMessage
                      message={form.formState.errors.title?.message}
                    />
                  )}
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

                <div className="flex flex-col gap-y-3 my-2 w-full">
                  <Label htmlFor="priority" className="text-white">
                    Priority:{" "}
                  </Label>
                  <select
                    {...form.register("priority")}
                    className="text-white w-full h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

                <div className="flex flex-row gap-x-2 w-full items-center">
                  <Label htmlFor="categoryTitle" className="text-white">
                    Category:{" "}
                  </Label>
                  <select
                    // disabled={categories?.length === 0}
                    defaultValue=""
                    {...form.register("categoryTitle")}
                    className="text-white w-full h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option
                      key=""
                      value=""
                      selected={true}
                      className="bg-background h-[10px] cursor-pointer transition hover:bg-white text-white hover:text-black"
                    ></option>
                    {categories?.map((title) => (
                      <option
                        key={title}
                        value={title}
                        className="bg-background h-[10px] cursor-pointer transition hover:bg-white text-white hover:text-black"
                      >
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  className="bg-lightbackground my-2 text-white"
                  onClick={() => {
                    if (!date) {
                      setDateCheck(false);
                    }
                  }}
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
