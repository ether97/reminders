import getCurrentUser from "@/app/actions/getCurrentUser";
import HomeClient from "./HomeClient";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full w-full p-5">
      <HomeClient currentUser={currentUser} />
    </div>
  );
}
