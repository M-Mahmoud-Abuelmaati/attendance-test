import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";
import PageLoading from "./components/PageLoading";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import UnProtectedRoutes from "./pages/UnProtectedRoutes ";
import UserProfile from "./pages/UserProfile";
import RootLayout from "./layouts/RootLayout";
import UserAdd from "./pages/UserAdd";
import UserEdit from "./pages/UserEdit";
import AttendanceAdd from "./pages/AttendanceAdd";

const availableRoutes = [
  {
    path: "/",
    component: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/auth/login",
    component: (
      <UnProtectedRoutes>
        <Login />
      </UnProtectedRoutes>
    ),
  },
  {
    path: "/users/:id",
    component: (
      <ProtectedRoutes>
        <UserProfile />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/users/add",
    component: (
      <ProtectedRoutes>
        <UserAdd />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/users/:id/edit",
    component: (
      <ProtectedRoutes>
        <UserEdit />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/users/:id/attendance/add",
    component: (
      <ProtectedRoutes>
        <AttendanceAdd />
      </ProtectedRoutes>
    ),
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {availableRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<PageLoading />}>
              <RootLayout>{route.component}</RootLayout>
            </Suspense>
          }
        />
      ))}

      <Route path="*" element={<Navigate to={"/login"} replace />} />
    </Route>
  )
);
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
