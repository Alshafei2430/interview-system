import { Navigate } from "react-router-dom";
import { UnauthorizedPage } from "../components/unauthorized/UnauthorizedPage";
import { useAuth } from "@/hooks/useAuth";

export default function Unauthorized() {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" />;
  }
  return <UnauthorizedPage />;
}
