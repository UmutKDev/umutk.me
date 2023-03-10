import { useState } from "react";
import Avatar from "@/components/Avatar";
import Connections from "@/components/Connections";
import Navigation from "@/components/Navigation";
import Presence from "@/components/Presence";
import useLanyard from "@/libs/lanyard";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ className, openOnMobile, toggleMobileMenu }: any): JSX.Element => {
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
      className={`${className} absolute top-0 left-0 lg:static h-full w-full lg:w-60 bg-black border-r border-[#1C1C1C] lg:flex lg:flex-col`}
    >
      {!openOnMobile && (
        <div className="flex items-center justify-between h-16 w-full lg:hidden z-20 p-8 border-b border-[#1C1C1C]">
          <p className="text-xl font-semibold text-white">
            Umut Kızıloğlu
          </p>
          <RxCross2 className="text-2xl text-white" onClick={toggleMobileMenu} />
        </div>
      )}
      <Avatar />
      <Navigation isActivityTrue={checkIfActivityTrue} />
      <Connections />
      {checkIfActivityTrue() && <Presence status={status} />}
    </aside>
  );
};

export default Sidebar;
