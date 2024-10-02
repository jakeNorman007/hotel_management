<script setup>
import { ref, onMounted } from "vue";
import CreateGuestModal from "../components/CreateGuestModal.vue";
import EditGuestModal from "../components/EditGuestModal.vue";
import { getGuests, onGuestsDelete } from "../services/guestsServices";

const guestsList = ref([]);

onMounted(async () => {
    guestsList.value = await getGuests();
});

const handleGuestAdd = (guest) => {
    guestsList.value.push({
        body: guest.Body,
    });
};

const handleGuestDelete = async (guestId) => {
    try {
        await onGuestsDelete(guestId);
        guestsList.value = guestsList.value.filter(guest => guest.id !== guestId);
        console.log("Guest deleted");
    } catch (error) {
        console.error("Error deleting guest", error);
    };
};
</script>

<template>
    <div class="m-[3rem]">
        <div class="flex justify-between">
            <h1 class="font-semibold text-3xl">Guests</h1>
            <CreateGuestModal @guest-added="handleGuestAdd"/>
        </div>
        <div class="grid grid-cols-5 px-3 py-[1rem] bg-gray-100 text-gray-600 border border-b-black border-t-white border-x-white font-semibold">
            <p>Id</p>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Email</p>
        </div>
        <div v-for="(guest, index) in guestsList" :key="guest.id" class="grid grid-cols-5 border border-b-black border-x-white px-3 py-[1rem]">
            <p>{{ guest.id }}</p>
            <p>{{ guest.first_name }}</p>
            <p>{{ guest.last_name }}</p>
            <p>{{ guest.email }}</p>
            <div class="flex static gap-[1rem]">
                <EditGuestModal :guestId="guest?.id" :firstName="guest?.first_name" :lastName="guest?.last_name" :email="guest?.email" />
                <button class="bg-green-200 text-green-700 font-semibold px-[2rem] py-1 hover:bg-green-400 hover:text-white" @click="handleGuestDelete(guest.id)">Delete</button>
            </div>
        </div>
    </div>
</template>
