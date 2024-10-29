<script setup>
import { Teleport, ref, watch } from "vue";
import { onRoomsUpdate } from "../services/roomsServices";

const props = defineProps(["roomId", "roomName", "roomPrice", "maxCapacity", "descriptionOfRoom"])

const editModalIsOpen = ref(false);
const editedRoom = ref({room_name: props.roomName, room_price: props.roomPrice, max_capacity: props.maxCapacity, description_of_room: props.descriptionOfRoom});

const idToEdit = props.roomId;

const onEdit = async () => {
  try {
    const updatedRoom = await onRoomsUpdate(idToEdit, editedRoom.value);
  } catch(error) {
    console.error("Failed to update room:", error);
  };
};
</script>

<template>
  <button @click="editModalIsOpen = true" class="py-2 px-6 font-semibold text-green-800 bg-green-200 hover:bg-green-400 hover:text-white rounded-md">
    <p>Edit</p>
  </button>
  <div v-if="editModalIsOpen" class="fixed inset-0 bg-black z-[998] opacity-25">
    <Teleport to="body">
      <div v-if="editModalIsOpen" class="fixed inset-0 z-[999] flex items-center justify-center">
        <form @submit="onEdit" class="flex flex-col gap-2 bg-white rounded-md">
          <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
            <p class="text-2xl font-semibold">Edit room.</p>
          </div>
          <div class="pt-[3rem] px-[2rem]">
            <div class="flex gap-[2rem]">
              <div>
                <label class="text-gray-400">
                  <p>Room name:</p>
                </label>
                <input :placeholder="roomName" v-model="editedRoom.room_name" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
              <div>
                <label class="text-gray-400">
                  <p>Room price:</p>
                </label>
                <input :placeholder="roomPrice" v-model="editedRoom.room_price" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
            </div>
            <div class="flex gap-[2rem] py-5">
              <div>
              <label class="text-gray-400">
                <p>Capacity:</p>
              </label>
              <input :placeholder="maxCapacity" v-model="editedRoom.max_capacity" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
              <div>
              <label class="text-gray-400">
                <p>Description:</p>
              </label>
              <input :placeholder="descriptionOfRoom" v-model="editedRoom.description_of_room" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
            </div>
          </div>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-green-200 text-green-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-green-400">
              <p class="pl-3">Create Room</p>
            </button>
            <button type="button" @click="editModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:text-white w-[50%] py-[1rem] rounded-br-md hover:bg-gray-400">
              <p class="pr-3">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
