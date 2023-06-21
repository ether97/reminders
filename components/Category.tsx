"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AiOutlineCloseCircle } from "react-icons/ai";

const handleClick = () => {};

const Category: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-lightbackground rounded-md overflow-hidden pl-4 pr-10 relative"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {title}
          <div className="h-full ease-in absolute right-0 w-[20px] bg-rose-700 hover:animate-getWide transition duration-200"></div>
        </AccordionTrigger>
        <AccordionContent>Reminders here</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Category;
