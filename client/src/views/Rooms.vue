<script setup>
import { ref, onMounted } from "vue";
import { getRooms, onRoomsDelete, onRoomsCreate } from "../services/roomsServices";

const roomsList = ref([]);

onMounted(async () => {
    roomsList.value = await getRooms();
});

const handleRoomDelete = async (roomId) => {
    try {
        await onRoomsDelete(roomId);
        roomsList.value = roomsList.value.filter(room => room.id !== roomId);
        console.log("Room deleted");
    } catch(error) {
        console.error("Error deleting room", error);
    };
};

const handleCreateRoom = async () => {
    await onRoomsCreate();
};
</script>

<template>
    <div class="m-[3rem]">
        <div class="flex justify-between">
            <h1 class="font-semibold pb-[2rem] text-3xl">Rooms</h1>
            <button class="bg-gray-200 p-3 my-3" @click="handleCreateRoom()">Create</button>
        </div>
        <div class="grid grid-cols-6 px-3 py-[1rem] border border-b-black font-semibold">
            <p>Id</p>
            <p>Name</p>
            <p>Price</p>
            <p>Capacity</p>
            <p>Description</p>
        </div>
        <div v-for="(room, index) in roomsList" :key="room.id" class="grid grid-cols-6 border border-b-black px-3 py-[1rem]">
            <p>{{ room.id }}</p>
            <p>{{ room.room_name }}</p>
            <p>{{ room.room_price }}</p>
            <p>{{ room.max_capacity }}</p>
            <p>{{ room.description_of_room}}</p>
            <div class="flex static pr-[4rem] gap-[1rem]">
                <button class="bg-gray-200 px-[1rem] py-1">Edit</button>
                <button class="bg-gray-200 px-[1rem] py-1" @click="handleRoomDelete(room.id)">Delete</button>
            </div>
        </div>
    </div>
</template>
