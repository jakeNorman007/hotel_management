<script setup>
import { Teleport, ref } from "vue";
import { onRoomsUpdate } from "../services/roomsServices";

const props = defineProps(["roomId", "roomName", "roomPrice", "maxCapacity", "descriptionOfRoom"])

const editModalIsOpen = ref(false);
const editedRoom = ref({room_name: "", room_price: "", max_capacity: "", description_of_room: ""});

const idToEdit = props.roomId;

const onEdit = async () => {
    try {
        const updatedRoom = await onRoomsUpdate(idToEdit, editedRoom.value);
        console.log("Room updated:", roomBooking);
    } catch(error) {
        console.error("Failed to update room:", error);
    };
};
</script>

<template>
    <button @click="editModalIsOpen = true" class="bg-green-200 px-[2rem] font-semibold text-green-700 py-1 hover:bg-green-400 hover:text-white">
        <p>Edit</p>
    </button>
    <div v-if="editModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
        <Teleport to="body">
            <div v-if="editModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
                <button @click="editModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
                <form @submit="onEdit" class="flex flex-col pl-[2rem]">
                    <label>Room name:</label>
                    <input :placeholder="roomName" v-model="editedRoom.room_name" required class="border border-black w-[20rem]"/>
                    <label>Room price:</label>
                    <input :placeholder="roomPrice" v-model="editedRoom.room_price" required  class="border border-black w-[20rem]"/>
                    <label>Capacity:</label>
                    <input :placeholder="maxCapacity" v-model="editedRoom.max_capacity" required class="border border-black w-[20rem]"/>
                    <label>Description:</label>
                    <textarea :placeholder="descriptionOfRoom" v-model="editedRoom.description_of_room" required class="border border-black w-[20rem]"/>
                    <button type="submit">Edit Room</button>
                    <button type="button" @click="editModalIsOpen = false">Cancel edit</button>
                </form>
            </div>
        </Teleport>
    </div>
</template>
