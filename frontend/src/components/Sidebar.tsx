import { SidebarItems } from "../constants";
import SidebarItem from "./SidebarItem";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <div className="flex items-center justify-center w-full h-16 bg-slate-100 shadow-md">
      {SidebarItems.map((item, idx) => (
        <SidebarItem key={idx} name={item.name} path={item.path} />
      ))}
    </div>
  );
};

export default Sidebar;
