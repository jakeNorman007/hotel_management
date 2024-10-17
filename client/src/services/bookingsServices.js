import axios from "axios";

export async function getBookings(page, perPage = 10) {
  try {
    const response = await axios.get(`http://localhost:3000/v1/bookings?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch(error) {
    console.error("Error getting bookings data:", error);
    return {data: [], error: "Failed to gather bookings data, please try again."};
  };
};

export async function onBookingsCreate(booking) {
  try {
    const response = await axios.post("http://localhost:3000/v1/bookings", booking);
    return response.data;
  } catch(error) {
    console.error("Error creating booking:", error);
  };
};

export async function onBookingsUpdate(bookingId, updatedBooking) {
  try {
    const response = await axios.put(`http://localhost:3000/v1/bookings/${bookingId}`, updatedBooking);
    return response.data;
  } catch(error) {
    console.error("Error editing booking:", error);
  };
};

export async function onBookingsDelete(bookingId) {
  try {
    const response = await axios.delete(`http://localhost:3000/v1/bookings/${bookingId}`);
    return response.data;
  } catch(error) {
    console.error("Error deleting booking", error);
  }
};
