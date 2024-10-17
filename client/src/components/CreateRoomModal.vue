<script setup>
import { Teleport, ref } from "vue";
import AddIcon from "../assets/icons/AddIcon.vue";
import { onRoomsCreate } from "../services/roomsServices";

const createModalIsOpen = ref(false);
const room = ref({room_name: "", room_price: "", max_capacity: "", description_of_room: ""});

const emit = defineEmits(["close", "room-added"]) 

const onSubmit = async() => {
  try {
    const response = await onRoomsCreate(room.value);
    emit("room-added", response);
    emit("close");
    room.value = {room_name: "", room_price: "", max_capacity: "", description_of_room: ""};
  } catch(error) {
    console.error("failed to submit room creation", error);
  };
};
</script>

<template>
  <button @click="createModalIsOpen = true" class="flex items-center gap-1 font-semibold text-green-800 bg-green-200 p-3 my-3 hover:bg-green-400 hover:text-white">
    <AddIcon/>
    <p>Create</p>
  </button>
  <div v-if="createModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="createModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
        <button @click="createModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
        <form @submit="onSubmit" class="flex flex-col pl-[2rem]">
          <label for="room_name">Room name:</label>
          <input id="room_name" autocomplete="on" v-model="room.room_name" placeholder="room name" required class="border border-black w-[20rem]"/>
          <label for="price">Price:</label>
          <input id="price" autocomplete="on" v-model="room.room_price" placeholder="room price" required class="border border-black w-[20rem]"/>
          <label for="capacity">Capacity:</label>
          <input id="capacity" autocomplete="on" v-model="room.max_capacity" placeholder="room capacity" required class="border border-black w-[20rem]"/>
          <label for="description">Description:</label>
          <input id="description" autocomplete="on" v-model="room.description_of_room" placeholder="room description" required class="border border-black w-[20rem]"/>
          <button type="submit">Create Room</button>
          <button type="button" @click="createModalIsOpen = false">Cancel</button>
        </form>
      </div>
    </Teleport>
  </div>
</template>
