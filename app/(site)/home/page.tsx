import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

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
  return (
    <div className="h-full w-full p-5">
      <div className="text-[50px]">
        Welcome back, <span className="font-semibold">{currentUser.name}</span>
      </div>
      <div className="text-[25px] text-zinc-400 font-extralight">
        Here are you reminders:
      </div>
    </div>
  );
}
