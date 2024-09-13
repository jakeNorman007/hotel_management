import axios from "axios";

export async function getGuests() {
    try {
        const response = await axios.get("http://localhost:3000/v1/guests");
        return response.data.map((i) => ({id: i.id, first_name: i.first_name, last_name: i.last_name, email: i.email}));
    } catch (error) {
        console.error("Error getting guests data:", error);
        return {data: [], error: "Failed to gather guests data, please try again."};
    }
};

export async function onGuestsDelete(guestId) {
    try {
        const response = await axios.delete("http://localhost:3000/v1/guests/${guestId}");
        return response.data;
    } catch(error) {
        console.error("Error deleting guest", error);
    }
};
