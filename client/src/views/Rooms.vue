<script setup>
import { ref, onMounted } from "vue";
import EditRoomModal from "../components/EditRoomModal.vue";
import CreateRoomModal from "../components/CreateRoomModal.vue";
import DeleteRoomWarningModal from "../components/DeleteRoomWarningModal.vue"; 
import { getRooms, onRoomsCreate } from "../services/roomsServices";

const roomsList = ref([]);

onMounted(async () => {
    roomsList.value = await getRooms();
});

const handleRoomAdd = (room) => {
    roomsList.value.push({
        body: room.Body,
    });
};
</script>

<template>
    <div class="m-[3rem]">
        <div class="flex justify-between">
            <h1 class="font-semibold text-3xl">Rooms</h1>
            <CreateRoomModal @room-added="handleRoomAdd"/>
        </div>
        <div class="grid grid-cols-6 px-3 py-[1rem] bg-gray-100 text-gray-600 border border-b-black border-t-white border-x-white font-semibold">
            <p>Id</p>
            <p>Name</p>
            <p>Price</p>
            <p>Capacity</p>
            <p>Description</p>
        </div>
        <div v-for="(room, index) in roomsList" :key="room.id" class="grid grid-cols-6 items-center border border-b-black border-x-white px-3 py-[1rem]">
            <p>{{ room.id }}</p>
            <p>{{ room.room_name }}</p>
            <p>{{ room.room_price }}</p>
            <p>{{ room.max_capacity }}</p>
            <p>{{ room.description_of_room}}</p>
            <div class="flex gap-2">
                <EditRoomModal :roomId="room?.id" :roomName="room?.room_name" :roomPrice="room?.room_price" :maxCapacity="room?.max_capacity" :descriptionOfRoom="room?.description_of_room"/>
                <DeleteRoomWarningModal :roomId="room?.id"/>
            </div>
        </div>
    </div>
</template>
