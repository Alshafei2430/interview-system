import { Separator } from "../ui/separator";
import { AppointmentItem } from "./AppointmentItem";

export const AppointmentList = () => {
  return (
    <div className="m-8 flex flex-col">
      <AppointmentItem />
      {/* <Separator /> */}
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem />
    </div>
  );
};
