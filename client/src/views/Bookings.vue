<script setup>
import { ref, onMounted, computed } from "vue";
import { getBookings } from "../services/bookingsServices";
import { getRooms } from "../services/roomsServices";
import EditBookingModal from "../components/EditBookingModal.vue";
import CreateBookingModal from "../components/CreateBookingModal.vue";
import DeleteBookingWarningModal from "../components/DeleteBookingWarningModal.vue";
import LeftArrow from "../assets/icons/LeftArrow.vue";
import RightArrow from "../assets/icons/RightArrow.vue";

const bookingsList = ref([]);
const roomsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const numberOfNights = ref(null);
const totalPrice = ref([]);
const mergedArray = ref([]);

const stuff = async (page) => {
  const arr = [];
  const dataOne = await getBookings(page);
  const dataTwo = await getRooms(page);

  dataOne.bookings.forEach((booking) => {
    const match = dataTwo.rooms.find((room) => room.id === booking.room_id);

    if(match) {
      const total = booking.number_of_nights * match.room_price;
      totalPrice.value.push({ totalId: booking.id, total });
      arr.push({ totalId: booking.id, total });
    };
  });

  arr.push(dataOne.bookings);

  const baz = arr.flat();
  mergedArray.value.push(...baz);
};

function findTotal(id) {
  const totalItem = mergedArray.value.find(item => item.totalId === id);
  return totalItem ? totalItem.total : 'No total available';
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
const filteredItems = computed(() => { return mergedArray.value.filter(item => item.id !== undefined); });

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
      <div class="flex items-center gap-4">
        <div v-if="!hasPrevPage">
          <div class="text-gray-200 py-2 px-4">
            <LeftArrow/>
          </div>
        </div>
        <div v-else>
          <button @click="loadBookings(currentPage - 1)" class="hover:bg-green-200 rounded-full py-2 px-4">
            <LeftArrow/>
          </button>
        </div>
        <div class="text-lg font-semibold">
          <p>{{ currentPage }} of {{ totalPages }} - {{ totalCount }} entries</p>
        </div>
        <div v-if="hasNextPage">
          <button @click="loadBookings(currentPage + 1)" class="hover:bg-green-200 rounded-full py-2 px-4">
            <RightArrow/>
          </button>
        </div>
        <div v-else>
          <div class="text-gray-200 py-2 px-4">
            <RightArrow/>
          </div>
        </div>
      </div>
      <CreateBookingModal @booking-added="handleBookingAdd"/>
    </div>
    <div class="grid grid-cols-9 px-3 py-[1rem] bg-gray-100 text-gray-600 border border-b-black border-t-white border-x-white font-semibold">
      <p>Booking #</p>
      <p># Nights</p>
      <p># Guests</p>
      <p>Total</p>
      <p>Room status</p>
      <p>Paid</p>
      <p>Room #</p>
      <p>Guest #</p>
    </div>
    <div v-for="item in filteredItems" :key="item.id" class="grid grid-cols-9 items-center border border-b-black border-x-white px-3 py-[1rem]">
      <p>{{ item.id }}</p>
      <p>{{ item.number_of_nights }}</p>
      <p>{{ item.number_of_guests }}</p>
      <div v-if="item.id !== undefined">
        <p class="text-green-600">${{ findTotal(item.id) }}.00</p>
      </div>
      <div v-if="item.status == 'occupied'">
        <p class="text-blue-600">{{ item.status }}</p>
      </div>
      <div v-else>
        <p class="text-red-600">{{ item.status }}</p>
      </div>
      <div v-if="item.is_paid == true">
        <p class="text-green-600">{{ item.is_paid }}</p>
      </div>
      <div v-else>
        <p class="text-red-600">{{ item.is_paid }}</p>
      </div>
      <p>{{ item.room_id }}</p>
      <p>{{ item.guest_id }}</p>
      <div class="flex gap-3">
        <EditBookingModal :bookingId="item?.id" :numberOfNights="item?.number_of_nights" :numberOfGuests="item?.number_of_guests" :bookingStatus="item?.status"
          :bookingIsPaid="item?.is_paid" :roomId="item?.room_id" :guestId="item?.guest_id"/>
        <DeleteBookingWarningModal :bookingId="item?.id"/>
      </div>
    </div>
  </div>
</template>
