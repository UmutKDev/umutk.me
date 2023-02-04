import Avatar from "src/components/layouts/sidebar/avatar";
import Connections from "./sidebar/connections";
import Navigation from "./sidebar/Navigation";
import Presence from "./sidebar/presence";

const Sidebar = (): JSX.Element => {
  return (
    <aside className="hidden h-full w-60 border-r border-[#1C1C1C] lg:flex lg:flex-col">
      <Avatar />
      <Navigation />
      <Connections />
      <Presence />
    </aside>
  );
};

export default Sidebar;
