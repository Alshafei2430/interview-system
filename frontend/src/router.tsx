import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import { RequireAuth } from "./components/RequireAuth";
import Home from "./routes/home";
import { AdminDashboard } from "./components/admin-dashboard/AdminDashboard";
import Unauthorized from "./routes/unauthorized";
import { ACCESS_ROLES } from "./constants";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          {
            element: (
              <RequireAuth
                allowedRoles={[ACCESS_ROLES.leader, ACCESS_ROLES.secretary]}
              />
            ),
            children: [
              {
                element: <Root />,
                children: [
                  {
                    path: "/",
                    element: <Home />,
                  },
                ],
              },
            ],
          },
          {
            element: <RequireAuth allowedRoles={[ACCESS_ROLES.admin]} />,
            errorElement: <ErrorPage />,
            children: [
              {
                element: <Root />,
                children: [
                  {
                    path: "/dashboard",
                    element: <AdminDashboard />,
                  },
                ],
              },
            ],
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/unauthorized",
            element: <Unauthorized />,
          },
        ],
      },
    ],
  },
]);
