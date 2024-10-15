<script setup>
import { ref, onMounted, computed } from "vue";
import { getBookings } from "../services/bookingsServices";
import { getRooms } from "../services/roomsServices";
import EditBookingModal from "../components/EditBookingModal.vue";
import CreateBookingModal from "../components/CreateBookingModal.vue";
import DeleteBookingWarningModal from "../components/DeleteBookingWarningModal.vue";

const bookingsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const numberOfNights = ref(null);
const totalPrice = ref([]);

const stuff = async (page) => {
  const dataOne = await getBookings(page);
  const dataTwo = await getRooms(page);

  dataOne.bookings.forEach((booking) => {
    const match = dataTwo.rooms.find((room) => room.id === booking.room_id);

    if(match) {
      const total = booking.number_of_nights * match.room_price;
      totalPrice.value.push({ totalId: booking.id, total });
    };
  });
};

const loadBookings = async (page) => {
  const data = await getBookings(page);

  if (data && data.meta) {
    bookingsList.value = data.bookings;
    totalPages.value = data.meta.total_pages;
    currentPage.value = data.meta.current_page;
    totalCount.value = data.meta.total_count;
  };
};

const hasPrevPage = computed(() => currentPage.value > 1);
const hasNextPage = computed(() => currentPage.value < totalPages.value);
const mergedArray = computed(() => { return [...bookingsList.value, ...totalPrice.value] });

const handleBookingAdd = (booking) => {
  bookingsList.value.push({
    body: booking.Body,
  });
};

onMounted(async () => {
  stuff(currentPage.value);
  loadBookings(currentPage.value);
});
</script>

<template>
  <div class="m-[3rem]">
    <div class="flex justify-between">
      <h1 class="font-semibold text-3xl">Bookings</h1>
      <CreateBookingModal @booking-added="handleBookingAdd"/>
    </div>
    <div class="grid grid-cols-9 px-3 py-[1rem] bg-gray-100 text-gray-600 border border-b-black border-t-white border-x-white font-semibold">
      <p>Id</p>
      <p>Nights</p>
      <p>Guests</p>
      <p>Total Price</p>
      <p>Status</p>
      <p>Paid</p>
      <p>Room Id</p>
      <p>Guest Id</p>
    </div>
    <div v-for="(item, index) in mergedArray" :key="item.id" class="grid grid-cols-9 border border-b-black border-x-white px-3 py-[1rem]">
        <p>{{ item.id }}</p>
        <p>{{ item.number_of_nights }}</p>
        <p>{{ item.number_of_guests }}</p>
        <p>${{ item.total }}.00</p>
        <div v-if="item.status == 'occupied'">
          <p class="text-red-700">{{ item.status }}</p>
        </div>
        <div v-else>
          <p class="text-indigo-700">{{ item.status }}</p>
        </div>
        <p>{{ item.is_paid }}</p>
        <p>{{ item.room_id }}</p>
        <p>{{ item.guest_id }}</p>
        <div class="flex gap-[1rem]">
          <EditBookingModal :bookingId="item?.id" :numberOfNights="item?.number_of_nights" :numberOfGuests="item?.number_of_guests" :totalPrice="item?.total_price" 
            :bookingStatus="item?.status" :bookingIsPaid="item?.is_paid" :roomId="item?.room_id" :guestId="item?.guest_id"/>
          <DeleteBookingWarningModal :bookingId="item?.id"/>
        </div>
    </div>
    {{ mergedArray }}
    <div class="flex justify-between mt-5">
      <button @click="loadBookings(currentPage - 1)" :disabled="!hasPrevPage" class="bg-green-200">Previous</button>
      <button @click="loadBookings(currentPage + 1)" :disabled="!hasNextPage" class="bg-green-200">Next</button>
      <p>Total guests: {{ totalCount }}</p>
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
    </div>
  </div>
</template>
