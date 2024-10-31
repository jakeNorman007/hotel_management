<script setup>
import { ref } from "vue";
import { onRoomsDelete } from "../services/roomsServices";

const roomsList = ref([]);
const deleteModalIsOpen = ref(false);

const props = defineProps(["roomId"])

const handleRoomDelete = async (roomId) => {
  try {
    await onRoomsDelete(roomId);
    roomsList.value = roomsList.value.filter(room => room.id !== roomId);
  } catch(error) {
    console.error("Error deleting room", error);
  };
};
</script>

<template>
  <button @click="deleteModalIsOpen = true" class="py-2 px-6 font-semibold text-green-800 bg-green-200 hover:bg-green-400 hover:text-white rounded-md">
    <p>Delete</p>
  </button>
  <div v-if="deleteModalIsOpen" class="h-screen absolute bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="deleteModalIsOpen" class="fixed inset-0 z-[999] flex items-center justify-center">
        <form @submit="handleGuestDelete(guestId)" class="flex flex-col gap-2 bg-white rounded-md">
          <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
            <p class="text-2xl font-semibold">Delete room.</p>
          </div>
          <p class="mt-[3rem] px-[3rem]">Are you sure?</p>
          <p class="px-[3rem]">This action is permanent and cannot be undone.</p>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-red-200 text-red-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-red-400">
              <p class="pl-3">Delete</p>
            </button>
            <button type="button" @click="deleteModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:text-white w-[50%] py-[1rem] rounded-br-md hover:bg-gray-400">
              <p class="pr-3">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
