import axios from "@/axios";
import { Appointment } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAppointment = (appointmentId: string): Promise<Appointment> =>
  axios
    .delete(`appointments/${appointmentId}`)
    .then((response) => response.data);

export default function useDeleteAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteAppointment"],
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
