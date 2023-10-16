import { SidebarItems } from "../constants";
import SidebarItem from "./SidebarItem";
import Cookies from "js-cookie";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <div className="flex items-center justify-center gap-5 w-full h-16 bg-slate-100 shadow-md">
      {SidebarItems.map((item, idx) => (
        <SidebarItem key={idx} name={item.name} path={item.path} />
      ))}
      <SidebarItem
        name={"Log Out"}
        path={"/logout"}
        onClick={() => {
          Cookies.remove("token");
          window.location.reload();
        }}
      />
    </div>
  );
};

export default Sidebar;
