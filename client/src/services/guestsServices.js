import axios from "axios";

export async function getGuests(page, perPage = 10) {
    try {
        const response = await axios.get(`http://localhost:3000/v1/guests?page=${page}&per_page=${perPage}`);
        return response.data;
    } catch(error) {
        console.error("Error getting guests data:", error);
        return {data: [], error: "Failed to gather guests data, please try again."};
    }
};

export async function getGuestsNoPagination() {
  try {
    const response = await axios.get("http://localhost:3000/v2/guests");
    return response.data;
  } catch(error) {
    console.error("Error getting guests data:", error);
    return {data: [], error: "Failed to gather guests data, please try again."};
  };
};

export async function onGuestsCreate(guest) {
    try {
        const response = await axios.post("http://localhost:3000/v1/guests", guest);
        return response.data;
    } catch(error) {
        console.error("Error creating guest:", error);
    };
};

export async function onGuestsUpdate(guestId, updatedGuest) {
    try {
        const response = await axios.put(`http://localhost:3000/v1/guests/${guestId}`, updatedGuest);
        return response.data;
    } catch(error) {
        console.error("Error editing guest:", error);
    };
};

export async function onGuestsDelete(guestId) {
    try {
        const response = await axios.delete(`http://localhost:3000/v1/guests/${guestId}`);
        return response.data;
    } catch(error) {
        console.error("Error deleting guest", error);
    }
};
