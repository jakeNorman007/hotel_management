import axios from "axios";

export async function getRooms() {
    try {
        const response = await axios.get("http://localhost:3000/v1/rooms");
        return response.data.map((i) => ({id: i.id, room_name: i.room_name, room_price: i.room_price, max_capacity: i.max_capacity,
            description_of_room: i.description_of_room})); 
    } catch(error) {
        console.error("Error getting rooms data:", error);
        return {data: [], error: "Failed to gather rooms data, please try again."};
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
