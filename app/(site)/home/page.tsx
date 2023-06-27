import getCurrentUser from "@/app/actions/getCurrentUser";
import HomeClient from "./HomeClient";
import Subcategory from "@/components/Subcategory";
import { SiClockify } from "react-icons/si";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full w-full p-5">
      {/* <div className="block lg:hidden">
        <Subcategory
          label="Priority Planner"
          icon={SiClockify}
          className="bg-lightbackground py-[43px] text-[20px]"
          inverted
        />
      </div> */}
      <HomeClient currentUser={currentUser} />
    </div>
  );
}
