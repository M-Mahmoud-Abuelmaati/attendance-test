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
    path: "/login",
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
