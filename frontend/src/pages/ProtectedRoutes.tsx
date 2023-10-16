import { PropsWithChildren } from "react";
import { useUser } from "../contexts/user";
import { Navigate } from "react-router-dom";
import { Routes } from "../constants";

interface ProtectedRoutesProps extends PropsWithChildren {}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? children : <Navigate to={Routes.login} replace />;
};

export default ProtectedRoutes;
