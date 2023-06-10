"use client";

const Skeleton = () => {
  return (
    <div className="flex flex-row gap-1 h-4 w-full">
      <div className="rounded-full h-[20px] animate-pulse bg-slate-800"></div>
      <div className="w-full flex flex-col gap-1">
        <div className="w-full rounded-md animate-pulse bg-slate-800"></div>

        <div className="w-4/5 rounded-md animate-pulse bg-slate-800"></div>
      </div>
    </div>
  );
};

export default Skeleton;
