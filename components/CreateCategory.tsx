import { User } from "@prisma/client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineFolderAdd } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { categorySchema } from "@/app/schemas/schemas";
import { CategorySchemaType } from "@/app/schemas/schemas";
import { Button } from "./ui/button";
import Subcategory from "./Subcategory";
import { Input } from "./ui/input";
import ErrorMessage from "./ErrorMessage";
import { useAddCategoryMutation } from "@/app/services/category";
import { toast } from "react-hot-toast";

const CreateCategory: React.FC<{
  currentUser: User;
  disabled?: boolean;
  mobile?: boolean;
}> = ({ currentUser, disabled, mobile }) => {
  const [addCategory] = useAddCategoryMutation();
  const [title, setTitle] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(title);
    addCategory(title)
      .then(() => {
        document.getElementById("innerSheet")?.click();
        document.getElementById("outerSheet")?.click();
        toast.success("Category added!");
      })
      .catch(() => {
        toast.error("Couldn&#39;t add category");
      });
  }

  if (mobile) {
    return (
      <>
        {!currentUser ? (
          <p className="text-center my-3 text-[20px] text-zinc-400">
            Log in to create categories...{" "}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col w-full color-white"
          >
            <Input
              type="text"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />

            <Button
              type="submit"
              className="bg-lightbackground my-2 text-white"
            >
              Create Category
            </Button>
          </form>
        )}
      </>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Subcategory
          label="Create Category"
          icon={AiOutlineFolderAdd}
          className={`${disabled && "bg-gray-700 cursor-not-allowed"}`}
        />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="mb-2 text-center text-white">
            Create Category
          </DialogTitle>
          <DialogDescription>
            {!currentUser ? (
              <p className="text-center my-3 text-[20px] text-zinc-400">
                Log in to create categories...{" "}
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col w-full color-white"
              >
                <Input
                  type="text"
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />

                <Button
                  type="submit"
                  className="bg-lightbackground my-2 text-white"
                >
                  Create Category
                </Button>
              </form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
