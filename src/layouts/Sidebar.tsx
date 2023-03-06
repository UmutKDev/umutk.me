import { useState } from "react";
import Avatar from "@/components/Avatar";
import Connections from "@/components/Connections";
import Navigation from "@/components/Navigation";
import Presence from "@/components/Presence";
import useLanyard from "@/libs/lanyard";

const Sidebar = ({ className }: any): JSX.Element => {
  const { loading, status } = useLanyard();

  const checkIfActivityTrue = () => {
    if (
      !loading &&
      status?.activities.find((activity) => activity.type !== 4)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <aside
      className={`${className} hidden h-full w-60 border-r border-[#1C1C1C] lg:flex lg:flex-col`}
    >
      <Avatar />
      <Navigation isActivityTrue={checkIfActivityTrue} />
      <Connections />
      {checkIfActivityTrue() && <Presence status={status} />}
    </aside>
  );
};

export default Sidebar;
