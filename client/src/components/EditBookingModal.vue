<script setup>
import { Teleport, ref, onMounted } from "vue";
import { getRooms } from "../services/roomsServices";
import { getGuests } from "../services/guestsServices";
import { onBookingsUpdate } from "../services/bookingsServices";

const props = defineProps(["bookingId", "numberOfNights", "numberOfGuests", "totalPrice", "bookingStatus", "bookingIsPaid", "roomId", "guestId"])

const roomsList = ref([]);
const guestsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const editModalIsOpen = ref(false);
const editedBooking = ref({number_of_nights: props.numberOfNights, number_of_guests: props.numberOfGuests, total_price: props.totalPrice, status: props.bookingStatus, is_paid: props.bookingIsPaid,
                            room_id: props.roomId, guest_id: props.guestId});

const idToEdit = props.bookingId;

const loadGuests = async (page) => {
  const data = await getGuests(page);

  if (data && data.meta) {
    guestsList.value = data.guests;
    totalPages.value = data.meta.total_pages;
    currentPage.value = data.meta.current_page;
    totalCount.value = data.meta.total_count;
  };
};

const loadRooms = async (page) => {
  const data = await getRooms(page);

  if (data && data.meta) {
    roomsList.value = data.rooms;
    totalPages.value = data.meta.total_pages;
    currentPage.value = data.meta.current_page;
    totalCount.value = data.meta.total_count;
  };
};

onMounted(async () => {
  loadRooms(currentPage.value);
});

onMounted(async () => {
    loadGuests(currentPage.value);
});

const onEdit = async () => {
    try {
        const updatedBooking = await onBookingsUpdate(idToEdit, editedBooking.value);
        console.log("Booking updated:", updatedBooking);
    } catch(error) {
        console.error("Failed to update booking:", error);
    };
};
</script>

<template>
    <button @click="editModalIsOpen = true" class="bg-green-200 px-[1rem] font-semibold text-green-700 py-1 hover:bg-green-400 hover:text-white">
        <p>Edit</p>
    </button>
    <div v-if="editModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
        <Teleport to="body">
            <div v-if="editModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
                <button @click="editModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
                <form @submit="onEdit" class="flex flex-col pl-[2rem]">
                    <label for="nights">Number of nights:</label>
                    <input id="nights" :placeholder="numberOfNights" v-model="editedBooking.number_of_nights" required class="border border-black w-[20rem]"/>
                    <label for="guests">Number of guests:</label>
                    <input id="guests" :placeholder="numberOfGuests" v-model="editedBooking.number_of_guests" required class="border border-black w-[20rem]"/>
                    <label for="price">Total Price:</label>
                    <input id="price":placeholder="totalPrice" v-model="editedBooking.total_price" required class="border border-black w-[20rem]"/>
                    <label for="status">Status:</label>
                    <select id="status" v-model="editedBooking.status" required class="border border-black w-[20rem]">
                        <option value="occupied">occupied</option>
                        <option value="unoccupied">unoccupied</option>
                    </select>
                    <label for="paid">Is Paid:</label>
                    <select id="paid" v-model="editedBooking.is_paid" required class="border border-black w-[20rem]">
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                    <label for="room">Room:</label>
                    <select id="room" required class="border border-black w-[20rem]">
                        <option v-for="(room, index) in roomsList" :key="index" value="id">{{ room.id }}: {{ room.room_name }}</option>
                    </select>
                    <label for="guest">Guest:</label>
                    <select id="guest" required class="border border-black w-[20rem]">
                        <option v-for="(guest, index) in guestsList" :key="index" value="id">{{ guest.id }}: {{ guest.first_name }} {{ guest.last_name }}</option>
                    </select>
                    <button type="submit">Edit Booking</button>
                    <button type="button" @click="editModalIsOpen = false">Cancel edit</button>
                </form>
            </div>
        </Teleport>
    </div>
</template>
