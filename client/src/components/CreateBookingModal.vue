<script setup>
import { Teleport, ref } from "vue";
import AddIcon from "../assets/icons/AddIcon.vue";
import { onBookingsCreate } from "../services/bookingsServices";

const createModalIsOpen = ref(false);
const booking = ref({number_of_nights: "", number_of_guests: "", total_price: "", status: "", room_id: "", guest_id: ""});
const emit = defineEmits(["close", "booking-added"]);

const onSubmit = async() => {
    try {
        const response = await onBookingsCreate(booking.value);
        emit("booking-added", response);
        emit("close");
        booking.value = {number_of_nights: "", number_of_guests: "", total_price: "", status: "", room_id: "", guest_id: ""};
    } catch(error) {
        console.error("failed to submit booking creation", error);
    };
};
</script>

<template>
    <button @click="createModalIsOpen = true" class="flex items-center gap-1 font-semibold text-green-800 bg-green-200 p-3 my-3 hover:bg-green-400 hover:text-white">
        <AddIcon/>
        <p>Create</p>
    </button>
    <div v-if="createModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
        <Teleport to="body">
            <div v-if="createModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
                <button @click="createModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
                <form @submit="onSubmit" class="flex flex-col pl-[2rem]">
                    <label>Number of nights:</label>
                    <input v-model="booking.number_of_nights" placeholder="number of nights" required class="border border-black w-[20rem]"/>
                    <label>Number of guests:</label>
                    <input v-model="booking.number_of_guests" placeholder="number of guests" required class="border border-black w-[20rem]"/>
                    <label>Total price:</label>
                    <input v-model="booking.total_price" placeholder="total price" required class="border border-black w-[20rem]"/>
                    <label>Status:</label>
                    <select v-model="booking.status" name="status" required class="border border-black w-[20rem]">
                        <option value="occupied">occupied</option>
                        <option value="unoccupied">unoccupied</option>
                    </select>
                    <label>Is paid:</label>
                    <select v-model="booking.is_paid" name="is paid" required class="border border-black w-[20rem]">
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                    <label>Room id:</label>
                    <input v-model="booking.room_id" placeholder="room id" required class="border border-black w-[20rem]"/>
                    <label>Guest id:</label>
                    <input v-model="booking.guest_id" placeholder="guest id" required class="border border-black w-[20rem]"/>
                    <button type="submit">Create Room</button>
                    <button type="button" @click="createModalIsOpen = false">Cancel</button>
                </form>
            </div>
        </Teleport>
    </div>
</template>
