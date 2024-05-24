import { NavBar } from "@/components/NavBar";
import { CreateAppointmentDialog } from "@/components/appointment/CreateAppointmentDialog";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="h-screen">
      <CreateAppointmentDialog />
      <NavBar />
      <Outlet />
    </div>
  );
}
