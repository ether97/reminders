"use client";

import { useGetRemindersQuery } from "@/app/services/app";

import { DataTable } from "@/components/Table/DataTable";
import { columns } from "../../../components/Table/ReminderColumns";

const HomeClient = () => {

    const {data, isLoading, error} = useGetRemindersQuery();

    if (data) {

        return (
          <>
            <div className="text-[25px] text-zinc-400 font-extralight">
              Here are your reminders...
            </div>
            <DataTable columns={columns} data={data} />
          </>
        );
    }

    return null;
};

export default HomeClient;
