<script setup>
import { ref, onMounted, computed } from "vue";
import EditBookingModal from "../components/EditBookingModal.vue";
import CreateBookingModal from "../components/CreateBookingModal.vue";
import DeleteBookingWarningModal from "../components/DeleteBookingWarningModal.vue";
import { getBookings } from "../services/bookingsServices";

const bookingsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);

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

const handleBookingAdd = (booking) => {
    bookingsList.value.push({
        body: booking.Body,
    });
};

onMounted(async () => {
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
    <div v-for="(booking, index) in bookingsList" :key="booking.id" class="grid grid-cols-9 border border-b-black border-x-white px-3 py-[1rem]">
      <p>{{ booking.id }}</p>
      <p>{{ booking.number_of_nights }}</p>
      <p>{{ booking.number_of_guests }}</p>
      <p>${{ booking.total_price }}.00</p>
      <div>
        <div v-if="booking.status == 'occupied'">
          <p class="text-red-700">{{ booking.status }}</p>
        </div>
        <div v-else>
          <p class="text-indigo-700">{{ booking.status }}</p>
        </div>
      </div>
      <p>{{ booking.is_paid }}</p>
      <p>{{ booking.room_id }}</p>
      <p>{{ booking.guest_id }}</p>
      <div class="flex gap-[1rem]">
        <EditBookingModal :bookingId="booking?.id" :numberOfNights="booking?.number_of_nights" :numberOfGuests="booking?.number_of_guests" :totalPrice="booking?.total_price" 
          :bookingStatus="booking?.status" :bookingIsPaid="booking?.is_paid" :roomId="booking?.room_id" :guestId="booking?.guest_id"/>
        <DeleteBookingWarningModal :bookingId="booking?.id"/>
      </div>
    </div>
    <div class="flex justify-between mt-5">
      <button @click="loadBookings(currentPage - 1)" :disabled="!hasPrevPage" class="bg-green-200">Previous</button>
      <button @click="loadBookings(currentPage + 1)" :disabled="!hasNextPage" class="bg-green-200">Next</button>
      <p>Total guests: {{ totalCount }}</p>
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
    </div>
  </div>
</template>
