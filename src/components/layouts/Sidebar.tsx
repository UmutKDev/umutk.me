import Avatar from "src/components/layouts/sidebar/avatar";
import Links from "./sidebar/Navigation";
import Presence from "./sidebar/presence";

const Sidebar = (): JSX.Element => {
  return (
    <aside className="h-screen w-60 border-r border-[#1C1C1C]">
      <Avatar />
      <Links />
      <Presence />
    </aside>
  );
};

export default Sidebar;
