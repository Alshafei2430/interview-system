import axios from "@/axios";
import { Appointment } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getAppointments = (): Promise<Appointment[]> =>
  axios.get("appointments").then((response) => response.data);

export default function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}
