<script setup>
import { Teleport, ref, onMounted } from "vue";
import { onBookingsUpdate } from "../services/bookingsServices";
import { getRoomsNoPagination } from "../services/roomsServices";
import { getGuestsNoPagination } from "../services/guestsServices";

const props = defineProps(["bookingId", "numberOfNights", "numberOfGuests", "totalPrice", "bookingStatus", "bookingIsPaid", "roomId", "guestId"])

const roomsList = ref([]);
const guestsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const editModalIsOpen = ref(false);
const editedBooking = ref({number_of_nights: props.numberOfNights, number_of_guests: props.numberOfGuests, total_price: props.totalPrice,
  status: props.bookingStatus, is_paid: props.bookingIsPaid, room_id: props.roomId, guest_id: props.guestId});

const idToEdit = props.bookingId;

const onEdit = async () => {
  try {
    const updatedBooking = await onBookingsUpdate(idToEdit, editedBooking.value);
  } catch(error) {
    console.error("Failed to update booking:", error);
  };
};

onMounted(async () => {
  guestsList.value = await getGuestsNoPagination(); 
  roomsList.value = await getRoomsNoPagination();
});
</script>

<template>
  <button @click="editModalIsOpen = true" class="px-5 py-2 bg-green-200 font-semibold text-green-700 hover:bg-green-400 hover:text-white rounded-md">
    <p>Edit</p>
  </button>
  <div v-if="editModalIsOpen" class="h-screen absolute bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="editModalIsOpen" class="fixed inset-0 z-[999] flex items-center justify-center">
        <form @submit="onEdit" class="flex flex-col gap-2 bg-white rounded-md">
          <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
            <p class="text-2xl font-semibold">Edit booking.</p>
          </div>
          <div class="pt-[3rem] px-[2rem]">
            <div class="flex gap-[2rem]">
              <div>
                <label for="nights">
                  <p class="text-gray-400">Number of nights:</p>
                </label>
                <input id="nights" :placeholder="numberOfNights" v-model="editedBooking.number_of_nights" required class="pl-2 h-[3rem] w-[16rem] border border-gray-400 rounded-md"/>
              </div>
              <div>
                <label for="guests">
                  <p class="text-gray-400">Number of guests:</p>
                </label>
                <input id="guests" :placeholder="numberOfGuests" v-model="editedBooking.number_of_guests" required class="pl-2 h-[3rem] w-[16rem] border border-gray-400 rounded-md"/>
              </div>
            </div>
            <div class="flex gap-[2rem] py-5">
              <div>
                <label for="status">
                  <p class="text-gray-400">Room status:</p>
                </label>
                <select id="status" v-model="editedBooking.status" required class="pl-2 h-[3rem] w-[16rem] border border-gray-400 rounded-md">
                  <option value="occupied">occupied</option>
                  <option value="unoccupied">unoccupied</option>
                </select>
              </div>
              <div>
                <label for="paid">
                  <p class="text-gray-400">Is Paid:</p>
                </label>
                <select id="paid" v-model="editedBooking.is_paid" required class="pl-2 h-[3rem] w-[16rem] border border-gray-400 rounded-md">
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>
            <div class="flex gap-[2rem]">
              <div>
                <label for="room">
                  <p class="text-gray-400">Room number:</p>
                </label>
                <select id="room" required class="pl-2 h-[3rem] w-[16rem] border border-gray-400 rounded-md">
                  <option v-for="(room, index) in roomsList" :key="index" value="id">{{ room.id }}: {{ room.room_name }}</option>
                </select>
              </div>
              <div>
                <label for="guest">
                  <p class="text-gray-400">Guest number:</p>
                </label>
                <select id="guest" required class="pl-2 h-[3rem] w-[16rem] border border-gray-400 rounded-md">
                  <option v-for="(guest, index) in guestsList" :key="guest.id" value="id">{{ guest.id }}: {{ guest.first_name }} {{ guest.last_name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-green-200 text-green-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-green-400">
              <p class="pl-3">Edit</p>
            </button>
            <button type="button" @click="editModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white w-[50%] py-[1rem] rounded-br-md">
              <p class="pr-3 ">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
