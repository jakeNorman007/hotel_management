<script setup>
import { ref, onMounted } from "vue";
import { getGuests, onGuestsDelete } from "../services/guestsServices";

const guestsList = ref([]);

onMounted(async () => {
    guestsList.value = await getGuests();
});

const handleGuestDelete = async () => {
};

</script>

<template>
    <div>
        <h1>Guests</h1>
        <div v-for="(guest, index) in guestsList" :key="index" class="flex gap-6">
            <p>{{ guest.id }}</p>
            <p>{{ guest.first_name }}</p>
            <p>{{ guest.last_name }}</p>
            <p>{{ guest.email }}</p>
            <button>Edit</button>
            <button @click="handleGuestDelete(guest.id)">Delete</button>
        </div>
    </div>
</template>
