import { Appointment } from "@/types";
import { AppointmentItem } from "./AppointmentItem";

interface AppointmentListProps {
  appointments: Appointment[];
}

export const AppointmentList = ({ appointments }: AppointmentListProps) => {
  return (
    <div className="m-8 flex flex-col">
      {appointments.map((appointment) => (
        <AppointmentItem key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};
