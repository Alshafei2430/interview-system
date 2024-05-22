import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const auth = useAuth();
  const location = useLocation();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (!auth.user && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAllowed = allowedRoles.find((role) => role === auth.user?.role);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  if (auth.user && location.pathname === "/login") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
