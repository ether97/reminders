import getCurrentUser from "@/app/actions/getCurrentUser";
import getReminders from "@/app/actions/getReminders";
import { DataTable } from "@/components/Table/DataTable";
import { columns } from "../../../components/Table/ReminderColumns";

export default async function Home() {
  const currentUser = await getCurrentUser();
  let reminders = await getReminders();

  if (reminders) {
    reminders = reminders.map((reminder) => {
      return { ...reminder, recurring: reminder.recurringDigit ? true : false };
    });
  }

  if (!currentUser) {
    return (
      <div className="h-full w-full p-5">
        <div className="text-[50px]">Welcome</div>
        <div className="text-[25px] text-zinc-400 font-extralight">
          Sign in to continue...
        </div>
      </div>
    );
  }

  if (!reminders) {
    return (
      <div className="h-full w-full p-5">
        Welcome back, <span className="font-semibold">{currentUser.name}</span>
        <div className="text-[25px] text-zinc-400 font-extralight">
          Currently, you have no reminders...
        </div>
      </div>
    );
  }
  return (
    <div className="h-full w-full p-5">
      <div className="text-[50px]">
        Welcome back, <span className="font-semibold">{currentUser.name}</span>
      </div>

      <div className="text-[25px] text-zinc-400 font-extralight">
        Here are your reminders...
      </div>
      <DataTable columns={columns} data={reminders} />
    </div>
  );
}
