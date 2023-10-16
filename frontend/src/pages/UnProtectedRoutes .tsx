import { PropsWithChildren } from "react";
import { useUser } from "../contexts/user";
import { Navigate } from "react-router-dom";
import { Routes } from "../constants";

interface UnProtectedRoutesProps extends PropsWithChildren {}

const UnProtectedRoutes = ({ children }: UnProtectedRoutesProps) => {
  const { isAuthenticated } = useUser();
  return !isAuthenticated ? children : <Navigate to={Routes.home} replace />;
};

export default UnProtectedRoutes;
