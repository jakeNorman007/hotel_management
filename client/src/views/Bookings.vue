<script setup>
import { ref, onMounted } from "vue";
import CreateBookingModal from "../components/CreateBookingModal.vue";
import { getBookings, onBookingsDelete } from "../services/bookingsServices";

const bookingsList = ref([]);

onMounted(async () => {
    bookingsList.value = await getBookings();
});

const handleBookingDelete = async (bookingId) => {
    try {
        await onBookingsDelete(bookingId);
        bookingsList.value = bookingsList.value.filter(booking => booking.id !== bookingId);
        console.log("Booking deleted");
    } catch (error) {
        console.error("Error deleting booking", error);
    };
};
</script>

<template>
    <div class="m-[3rem]">
        <div class="flex justify-between">
            <h1 class="font-semibold mb-[2rem] text-3xl">Bookings</h1>
            <CreateBookingModal/>
        </div>
        <div class="grid grid-cols-9 px-3 py-[1rem] border border-b-black font-semibold">
            <p>Id</p>
            <p>Nights</p>
            <p>Guests</p>
            <p>Total Price</p>
            <p>Status</p>
            <p>Paid</p>
            <p>Room Id</p>
            <p>Guest Id</p>
        </div>
        <div v-for="(booking, index) in bookingsList" :key="booking.id" class="grid grid-cols-9 border border-b-black px-3 py-[1rem]">
            <p>{{ booking.id }}</p>
            <p>{{ booking.number_of_nights }}</p>
            <p>{{ booking.number_of_guests }}</p>
            <p>{{ booking.total_price }}</p>
            <p>{{ booking.status }}</p>
            <p>{{ booking.is_paid }}</p>
            <p>{{ booking.room_id }}</p>
            <p>{{ booking.guest_id }}</p>
            <div class="flex static pr-[4rem] gap-[1rem]">
                <button class="bg-gray-200 px-[1rem] py-1">Edit</button>
                <button class="bg-gray-200 px-[1rem] py-1" @click="handleBookingDelete(booking.id)">Delete</button>
            </div>
        </div>
    </div>
</template>
