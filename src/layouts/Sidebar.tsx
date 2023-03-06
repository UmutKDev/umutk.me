import { useState } from "react";
import Avatar from "@/components/Avatar";
import Connections from "@/components/Connections";
import Navigation from "@/components/Navigation";
import Presence from "@/components/Presence";

const Sidebar = ({ className }: any): JSX.Element => {
  const [isActivity, setIsActivity] = useState(false);
  return (
    <aside
      className={`${className} hidden h-full w-60 border-r border-[#1C1C1C] lg:flex lg:flex-col`}
    >
      <Avatar />
      <Navigation isActivityTrue={isActivity} />
      <Connections />
      {isActivity && <Presence />}
    </aside>
  );
};

export default Sidebar;
