import { createBooking } from "../api/user/bookingApi";

export const createBookingService = async (bookingData) => {
  const data = await createBooking(bookingData);
  return data;
}
