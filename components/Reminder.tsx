"use client";

const ReminderComponent: React.FC<{ label: string; priority: string }> = ({
  label,
  priority,
}) => {
  return (
    <div
      className={`${
        priority === "High"
          ? "bg-gradient-to-l from-rose-800"
          : priority === "Medium"
          ? "bg-gradient-to-l from-orange-600"
          : priority === "Low"
          ? "bg-gradient-to-l from-green-700"
          : ""
      }
      flex flex-row gap-3 items-center w-full  rounded-md text-md py-1 px-4 my-2 cursor-pointer
    `}
    >
      <p className="w-full text-md text-end">{label}</p>
    </div>
  );
};

export default ReminderComponent;
