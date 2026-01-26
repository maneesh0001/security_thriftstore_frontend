import { useMutation } from "@tanstack/react-query";
import { createBookingService } from "../services/bookingService";



export const useCreateBooking = () => {
  return useMutation({
    mutationKey: ['createBooking'],
    mutationFn: createBookingService,
  });
};
