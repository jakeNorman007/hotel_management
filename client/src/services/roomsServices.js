import axios from "axios";

export async function getRooms(page, perPage = 10) {
  try {
    const response = await axios.get(`http://localhost:3000/v1/rooms?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch(error) {
    console.error("Error getting rooms data:", error);
    return {data: [], error: "Failed to gather rooms data, please try again."};
  };
};

export async function getRoomsNoPagination() {
  try {
    const response = await axios.get("http://localhost:3000/v2/rooms");
    return response.data;
  } catch(error) {
    console.error("Error getting guests data:", error);
    return {data: [], error: "Failed to gather guests data, please try again."};
  };
};

export async function onRoomsCreate(room) {
  try {
    const response = await axios.post("http://localhost:3000/v1/rooms", room);
    return response.data;
  } catch(error) {
    console.error("Error creating room:", error);
  };
};

export async function onRoomsUpdate(roomId, updatedRoom) {
  try {
    const response = await axios.put(`http://localhost:3000/v1/rooms/${roomId}`, updatedRoom);
    return response.data;
  } catch(error) {
    console.error("Error editing room:", error);
  };
};

export async function onRoomsDelete(roomId) {
  try {
    const response = await axios.delete(`http://localhost:3000/v1/rooms/${roomId}`);
    return response.data;
  } catch(error) {
    console.error("Error deleting room", error);
  }
};
