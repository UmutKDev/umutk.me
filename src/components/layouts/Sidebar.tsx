import Avatar from "./Avatar";
import Connections from "./Connections";
import Navigation from "./Navigation";
import Presence from "./Presence";

const Sidebar = ({ className }: any): JSX.Element => {
  return (
    <aside
      className={`${className} hidden h-full w-60 border-r border-[#1C1C1C] lg:flex lg:flex-col`}
    >
      <Avatar />
      <Navigation />
      <Connections />
      <Presence />
    </aside>
  );
};

export default Sidebar;
