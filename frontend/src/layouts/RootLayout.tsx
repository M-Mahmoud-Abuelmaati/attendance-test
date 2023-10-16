import { PropsWithChildren } from "react";
import Sidebar from "../components/Sidebar";
import { useUser } from "../contexts/user";

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout = ({ children }: RootLayoutProps) => {
  const { isAuthenticated } = useUser();

  return (
    <div className="bg-paper h-screen w-screen">
      {isAuthenticated && <Sidebar />}
      {children}
    </div>
  );
};

export default RootLayout;
