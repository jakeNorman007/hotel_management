<script setup>
import { ref, onMounted } from "vue";
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
    <div>
        <h1>Bookings view</h1>
        <div v-for="(booking, index) in bookingsList" :key="booking.id" class="flex gap-6">
            <p>{{ booking.id }}</p>
            <p>{{ booking.number_of_nights }}</p>
            <p>{{ booking.number_of_guests }}</p>
            <p>{{ booking.total_price }}</p>
            <p>{{ booking.status }}</p>
            <p>{{ booking.is_paid }}</p>
            <p>{{ booking.room_id }}</p>
            <p>{{ booking.guest_id }}</p>
            <button>Edit</button>
            <button @click="handleBookingDelete(booking.id)">Delete</button>
        </div>
    </div>
</template>
