import axios from "axios";

export async function getBookings() {
    try {
        const response = await axios.get("http://localhost:3000/v1/bookings");
        return response.data.map((i) => ({id: i.id, number_of_nights: i.number_of_nights, total_price: i.total_price, status: i.status,
            is_paid: i.is_paid, room_id: i.room_id, guest_id: i.guest_id})); 
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

export async function onBookingsDelete(bookingId) {
    try {
        const response = await axios.delete(`http://localhost:3000/v1/bookings/${bookingId}`);
        return response.data;
    } catch(error) {
        console.error("Error deleting booking", error);
    }
};
