import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Trash, Hourglass, Check, X, LogIn } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ACCESS_ROLES } from "../constants";

type appointmentStatusType = "accept" | "reject" | "suspend";

const appointmentStatusClasses = {
  accept: "bg-green-500",
  reject: "bg-red-600",
  suspend: "bg-amber-300",
};

export const AppointmentItem = () => {
  const auth = useAuth();
  const [appointmentStatus, setAppointmentStatus] =
    useState<appointmentStatusType | null>(null);

  return (
    <div
      className={cn(
        "text-center bg-amber-300 lg:text-xl text-xs border min-h-36 mb-2 grid grid-cols-6 divide-x bg-stone-100",
        appointmentStatus && appointmentStatusClasses[appointmentStatus]
      )}
    >
      <div className="col-span-2">
        <div className="h-full w-full flex items-center justify-around">
          {auth.user?.role === ACCESS_ROLES.leader && (
            <>
              <Button
                className="gap-2 hover:bg-red-600 lg:w-24 md:w-14 w-8 text-sm"
                size="sm"
                onClick={() => setAppointmentStatus("reject")}
              >
                <span>رفض</span>
                <X />
              </Button>
              <Button
                className="gap-2 hover:bg-amber-300 lg:w-24 md:w-14 w-8 text-sm"
                size="sm"
                onClick={() => setAppointmentStatus("suspend")}
              >
                <span>انتظار</span>
                <Hourglass />
              </Button>
              <Button
                className="gap-2 hover:bg-green-500 lg:w-24 md:w-14 w-8 text-sm"
                size="sm"
                onClick={() => setAppointmentStatus("accept")}
              >
                <span>دخول</span>
                <LogIn />
              </Button>
            </>
          )}
          {auth.user?.role === ACCESS_ROLES.secretary && (
            <Button className="gap-2 hover:bg-red-600">
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
            <p className="">عبدالرحمن عماد الدين محمد الشافعي</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col  w-full h-full items-center justify-center">
        <p className="py-2">موعد الوصول</p>
        <Separator />
        <div className="flex-1">
          <div className="flex items-center h-full">
            <p className="">عبدالرحمن عماد الدين محمد الشافعي</p>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col  w-full h-full items-center justify-center">
        <p className="py-2">الضيف</p>
        <Separator />
        <div className="flex-1">
          <div className="flex items-center h-full">
            <p className="">عبدالرحمن عماد الدين محمد الشافعي</p>
          </div>
        </div>
      </div>
    </div>
  );
};
