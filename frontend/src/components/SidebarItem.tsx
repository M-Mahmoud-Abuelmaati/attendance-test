import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  name: string;
  path: string;
}
const SidebarItem = ({ name, path }: SidebarItemProps) => {
  const navigate = useNavigate();
  return (
    <span
      className="cursor-pointer hover:text-blue-500"
      onClick={() => navigate(path)}
    >
      {name}
    </span>
  );
};

export default SidebarItem;
