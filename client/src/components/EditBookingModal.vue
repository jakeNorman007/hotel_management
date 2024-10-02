<script setup>
import { Teleport, ref } from "vue";
import { onBookingsUpdate } from "../services/bookingsServices";

const props = defineProps(["bookingId", "numberOfNights", "numberOfGuests", "totalPrice", "bookingStatus", "bookingIsPaid", "roomId", "guestId"])

const editModalIsOpen = ref(false);
const editedBooking = ref({number_of_nights: "", number_of_guests: "", total_price: "", status: "", is_paid: "", room_id: "", guest_id: ""});

const idToEdit = props.bookingId;

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
                    <label>Number of nights:</label>
                    <input :placeholder="numberOfNights" v-model="editedBooking.number_of_nights" required class="border border-black w-[20rem]"/>
                    <label>Number of guests:</label>
                    <input :placeholder="numberOfGuests" v-model="editedBooking.number_of_guests" required class="border border-black w-[20rem]"/>
                    <label>Total Price:</label>
                    <input :placeholder="totalPrice" v-model="editedBooking.total_price" required class="border border-black w-[20rem]"/>
                    <label>Status:</label>
                    <input :placeholder="bookingStatus" v-model="editedBooking.status" required class="border border-black w-[20rem]"/>
                    <label>Is Paid:</label>
                    <input :placeholder="bookingIsPaid" v-model="editedBooking.is_paid" required class="border border-black w-[20rem]"/>
                    <label>Room Id:</label>
                    <input :placeholder="roomId" v-model="editedBooking.room_id" required class="border border-black w-[20rem]"/>
                    <label>Guest Id:</label>
                    <input :placeholder="guestId" v-model="editedBooking.guest_id" required class="border border-black w-[20rem]"/>
                    <button type="submit">Edit Booking</button>
                    <button type="button" @click="editModalIsOpen = false">Cancel edit</button>
                </form>
            </div>
        </Teleport>
    </div>
</template>
