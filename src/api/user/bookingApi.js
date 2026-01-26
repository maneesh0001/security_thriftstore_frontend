// FILE: src/api/bookingService.js
import instance from "../Api";

export const createBooking = async (bookingData) => {
  const response = await instance.post('/bookings', bookingData);
  return response.data;
};
