import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "../components/login/LoginPage";
import { Navigate } from "react-router-dom";

export default function Login() {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" />;
  }
  return <LoginPage />;
}
