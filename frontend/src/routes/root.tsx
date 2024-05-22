import { NavBar } from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export default function Root() {
  const auth = useAuth();
  console.log(auth.user);

  auth.getAuthStatus();

  return (
    <div className="h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}
