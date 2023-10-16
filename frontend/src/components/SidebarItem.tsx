import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  name: string;
  path: string;
  onClick?: () => void;
}
const SidebarItem = ({ name, path, onClick }: SidebarItemProps) => {
  const navigate = useNavigate();
  return (
    <span
      className="cursor-pointer hover:text-blue-500"
      onClick={() => (onClick ? onClick() : navigate(path))}
    >
      {name}
    </span>
  );
};

export default SidebarItem;
