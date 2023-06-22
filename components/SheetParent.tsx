"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetParentProps {
  trigger: React.ReactElement;
  content: React.ReactElement;
  position: "top" | "bottom" | "left" | "right" | null | undefined;
  type: "inner" | "outer";
}

const SheetParent: React.FC<SheetParentProps> = ({
  trigger: Trigger,
  content: Content,
  position,
  type,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        {Trigger}
        {/* <Button className="bg-lightbackground text-white w-[100px]">
                        Login
                      </Button> */}
      </SheetTrigger>
      <SheetContent
        position={position}
        size="full"
        className="h-1/2 border-none bg-neutral-800/10"
      >
        <SheetHeader className="flex flex-col h-full  items-center justify-center">
          <SheetTitle></SheetTitle>
          <SheetDescription className="flex flex-col gap-y-4 items-center justify-center h-full w-full">
            <SheetClose id={`${type}Sheet`} />
            {Content}
            {/* <LoginForm mobile /> */}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetParent;
