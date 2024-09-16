<script setup>
import { ref, onMounted } from "vue";
import { getRooms, onRoomsDelete } from "../services/roomsServices";

const roomsList = ref([]);

onMounted(async () => {
    roomsList.value = await getRooms();
});

const handleRoomDelete = async (roomId) => {
    try {
        await onRoomsDelete(roomId);
        roomsList.value = roomsList.value.filter(room => room.id !== roomId);
        console.log("Room deleted");
    } catch (error) {
        console.error("Error deleting room", error);
    };
};
</script>

<template>
    <div>
        <h1>Rooms view</h1>
        <div v-for="(room, index) in roomsList" :key="room.id" class="flex gap-6">
            <p>{{ room.id }}</p>
            <p>{{ room.room_name }}</p>
            <p>{{ room.room_price }}</p>
            <p>{{ room.max_capacity }}</p>
            <p>{{ room.description_of_room}}</p>
            <button>Edit</button>
            <button @click="handleRoomDelete(room.id)">Delete</button>
        </div>
    </div>
</template>
