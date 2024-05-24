import useAppointments from "@/hooks/useAppointments";
import { AppointmentList } from "./appointment/AppointmentList";
import { Loader } from "./Loader";

export const HomePage = () => {
  const { isLoading, isSuccess, data } = useAppointments();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    console.log(data);
    return (
      <div>
        <AppointmentList appointments={data} />
      </div>
    );
  }
};
