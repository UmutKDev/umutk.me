import Avatar from "src/components/layouts/sidebar/avatar";
import Navigation from "./sidebar/Navigation";
import Presence from "./sidebar/presence";

const Sidebar = (): JSX.Element => {
  return (
    <aside className="hidden h-screen w-60 border-r border-[#1C1C1C] lg:block">
      <Avatar />
      <Navigation />
      <Presence />
    </aside>
  );
};

export default Sidebar;
