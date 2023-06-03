import Avatar from "@/components/Avatar";
import Connections from "@/components/Connections";
import Navigation from "@/components/Navigation";
import Presence from "@/components/Presence";
import useLanyard from "@/libs/lanyard";
import { RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
const Sidebar = ({
  className,
  openOnMobile,
  toggleMobileMenu,
}: any): JSX.Element => {
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

  return openOnMobile ? (
    <div
      className={[
        poppins.className,
        "absolute z-20 flex h-16 w-full items-center justify-between border-b border-[#1C1C1C] p-8 lg:hidden",
      ].join(" ")}
    >
      <p className="text-xl font-semibold text-white">Umut Kızıloğlu</p>
      <FaBars className="text-xl text-white" onClick={toggleMobileMenu} />
    </div>
  ) : (
    <aside
      className={[
        poppins.className,
        className,
        "absolute left-0 top-0 h-full w-full border-r border-[#1C1C1C] bg-black lg:static lg:flex lg:w-60 lg:flex-col",
      ].join(" ")}
    >
      {!openOnMobile && (
        <div className="z-20 flex h-16 w-full items-center justify-between border-b border-[#1C1C1C] p-8 lg:hidden">
          <p className="text-xl font-semibold text-white">Umut Kızıloğlu</p>
          <RxCross2
            className="text-2xl text-white"
            onClick={toggleMobileMenu}
          />
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
