<script setup>
import { ref, onMounted } from "vue";
import EditGuestModal from "../components/EditGuestModal.vue";
import CreateGuestModal from "../components/CreateGuestModal.vue";
import DeleteGuestWarningModal from "../components/DeleteGuestWarningModal.vue";
import { getGuests } from "../services/guestsServices";

const guestsList = ref([]);

onMounted(async () => {
    guestsList.value = await getGuests();
});

const handleGuestAdd = (guest) => {
    guestsList.value.push({
        body: guest.Body,
    });
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
                <EditGuestModal :guestId="guest?.id" :firstName="guest?.first_name" :lastName="guest?.last_name" :email="guest?.email"/>
                <DeleteGuestWarningModal :guestId="guest?.id"/>
            </div>
        </div>
    </div>
</template>
