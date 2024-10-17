<script setup>
import { ref } from "vue";
import { onBookingsDelete } from "../services/bookingsServices";

const bookingsList = ref([]);
const deleteModalIsOpen = ref(false);

const props = defineProps(["bookingId"])

const handleBookingDelete = async (bookingId) => {
  try {
    await onBookingsDelete(bookingId);
    bookingsList.value = bookingsList.value.filter(booking => booking.id !== bookingId);
  } catch(error) {
    console.error("Error deleting booking", error);
  };
};
</script>

<template>
  <button @click="deleteModalIsOpen = true" class="px-4 font-semibold text-green-800 bg-green-200 hover:bg-green-400 hover:text-white">
    <p>Delete</p>
  </button>
  <div v-if="deleteModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="deleteModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
        <button @click="deleteModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
        <form @submit="handleBookingDelete(bookingId)" class="flex flex-col pl-[2rem]">
          <p>You sure man?</p>
          <button type="submit">Delete Room</button>
          <button type="button" @click="deleteModalIsOpen = false">Cancel</button>
        </form>
      </div>
    </Teleport>
  </div>
</template>
