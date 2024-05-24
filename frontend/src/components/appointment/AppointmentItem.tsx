import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Trash, Hourglass, X, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCESS_ROLES } from "../../constants";
import { getSocket } from "@/socket";
import { Appointment, AppointmentStatusType } from "@/types";
import useDeleteAppointment from "@/hooks/useDeleteAppointment";
import notification from "@/assets/iphone_notification.mp3";

interface AppointmentItemProps {
  appointment: Appointment;
}

const appointmentStatusClasses = {
  accept: "bg-green-500",
  reject: "bg-red-600",
  suspend: "bg-amber-300",
  default: "",
};

export const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  const { mutate } = useDeleteAppointment();
  const auth = useAuth();
  const io = getSocket();
  const sound = new Audio(notification);

  const [appointmentStatus, setAppointmentStatus] =
    useState<AppointmentStatusType | null>(null);

  const handleAppointmentAction = (status: AppointmentStatusType) => {
    io.emit("change_appointment_status", status, appointment.id);
    setAppointmentStatus(status);
  };

  io.on(
    "appointment_status_changed",
    (newStatus: AppointmentStatusType, appointmentId: string) => {
      if (appointment.id === appointmentId) setAppointmentStatus(newStatus);
      sound.play();
    }
  );

  const handleDeleteAppointment = () => {
    mutate(appointment.id, {
      onSuccess: () => {
        io.emit("appointment_deleted", appointment.id);
      },
    });
  };

  const displayDate = (date: Date) => {
    const currentUTCDate = new Date(date).toUTCString();

    // Format the date according to the locale and time zone
    const newDate = new Date(currentUTCDate).toLocaleTimeString("ar-EG", {
      timeZone: "UTC",
    });

    return <span className="text-lg lg:text-2xl">{newDate}</span>;
  };

  return (
    <div
      className={cn(
        "text-center lg:text-2xl border min-h-36 mb-2 grid grid-cols-6 divide-x bg-stone-100",
        appointmentStatus && appointmentStatusClasses[appointmentStatus]
      )}
    >
      <div className="col-span-2">
        <div className="h-full w-full flex flex-col lg:flex-row  items-center justify-around ">
          {auth.user?.role === ACCESS_ROLES.leader && (
            <>
              <Button
                className="gap-2 hover:bg-red-600 text-sm md:text-lg"
                onClick={() => handleAppointmentAction("reject")}
              >
                <span>رفض</span>
                <X />
              </Button>
              <Button
                className="gap-2 hover:bg-amber-300 text-sm md:text-lg"
                onClick={() => handleAppointmentAction("suspend")}
              >
                <span>انتظار</span>
                <Hourglass />
              </Button>
              <Button
                className="gap-2 hover:bg-green-500 text-sm md:text-lg"
                onClick={() => handleAppointmentAction("accept")}
              >
                <span>دخول</span>
                <LogIn />
              </Button>
            </>
          )}
          {auth.user?.role === ACCESS_ROLES.secretary && (
            <Button
              className="gap-2 hover:bg-red-600"
              onClick={handleDeleteAppointment}
            >
              <Trash />
              <span>حذف</span>
            </Button>
          )}
        </div>
      </div>
      <div className=" flex flex-col  w-full h-full items-center justify-center">
        <p className="py-2">موعد الدخول</p>
        <Separator />
        <div className="flex-1">
          <div className="flex items-center h-full">
            <p className="">{displayDate(appointment.enterDate)}</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col  w-full h-full items-center justify-center">
        <p className="py-2">موعد الوصول</p>
        <Separator />
        <div className="flex-1">
          <div className="flex items-center h-full">
            <p className="">{displayDate(appointment.arriveDate)}</p>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col  w-full h-full items-center justify-center">
        <p className="py-2">الضيف</p>
        <Separator />
        <div className="flex-1">
          <div className="flex items-center h-full">
            <p className="">{appointment.guestName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
