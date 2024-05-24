import axios from "@/axios";
import { Appointment } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createAppointment = (newAppointment: {
  guestName: string;
}): Promise<Appointment> =>
  axios.post("appointments", newAppointment).then((response) => response.data);

export default function useCreateAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createAppointment"],
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
