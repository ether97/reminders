"use client";

import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/app/services/category";
import { useGetRemindersQuery } from "@/app/services/reminder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GrFormClose } from "react-icons/gr";
import ReminderComponent from "./Reminder";

const Category: React.FC<{ title: string }> = ({ title }) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: reminders } = useGetRemindersQuery();
  const filtered = reminders?.filter(
    (reminder) => reminder.categoryTitle === title
  );
  console.log(filtered);
  const handleClick = () => {
    deleteCategory(title);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-lightbackground rounded-md overflow-hidden pl-4 pr-10 relative"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {title}
          <GrFormClose
            onClick={handleClick}
            size={20}
            className="h-full ease-in absolute right-[10px] text-rose-700 "
          />
        </AccordionTrigger>
        <AccordionContent>
          {filtered && filtered.length > 0 ? (
            filtered.map((reminder) => {
              return (
                <ReminderComponent
                  key={reminder.title}
                  label={reminder.title}
                  priority={reminder.priority}
                  title={reminder.title}
                />
              );
            })
          ) : (
            <p>No reminders yet...</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Category;
