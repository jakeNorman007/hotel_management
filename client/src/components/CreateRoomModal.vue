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
  <button @click="createModalIsOpen = true" class="flex items-center gap-1 font-semibold text-green-800 bg-green-200 p-3 my-3 hover:bg-green-400 hover:text-white rounded-md">
    <AddIcon/>
    <p>Create</p>
  </button>
  <div v-if="createModalIsOpen" class="fixed inset-0 bg-black z-[998] opacity-25">
    <Teleport to="body">
      <div v-if="createModalIsOpen" class="fixed inset-0 z-[999] flex items-center justify-center">
        <form @submit="onSubmit" class="flex flex-col gap-2 bg-white rounded-md">
          <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
            <p class="text-2xl font-semibold">Create a new room.</p>
          </div>
          <div class="pt-[3rem] px-[2rem]">
          <div class="flex gap-[2rem]">
          <div>
            <label for="room_name">
              <p class="text-gray-400">Room name:</p>
            </label>
            <input id="room_name" autocomplete="on" v-model="room.room_name" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
          </div>
          <div>
            <label for="price">
              <p class="text-gray-400">Price:</p>
            </label>
            <input id="price" autocomplete="on" v-model="room.room_price" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
          </div>
          </div>
          <div class="flex gap-[2rem] py-5">
          <div>
            <label for="capacity">
              <p class="text-gray-400">Capacity:</p>
            </label>
            <input id="capacity" autocomplete="on" v-model="room.max_capacity" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
          </div>
          <div>
            <label for="description">
              <p class="text-gray-400">Description:</p>
            </label>
            <input id="description" autocomplete="on" v-model="room.description_of_room" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
          </div>
          </div>
          </div>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-green-200 text-green-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-green-400">
              <p class="pl-3">Create Room</p>
            </button>
            <button type="button" @click="createModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:text-white w-[50%] py-[1rem] rounded-br-md hover:bg-gray-400">
              <p class="pr-3">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
