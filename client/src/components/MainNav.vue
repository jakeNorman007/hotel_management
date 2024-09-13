<script setup>
import { useRouter } from "vue-router";
import { useSessionManagerStore } from "../store/index.js";

const router = useRouter();
const sessionManagerStore = useSessionManagerStore();

const logOutUser = () => {
    sessionManagerStore.logoutUser();
    router.push("/auth");
};
</script>

<template>
    <div class="flex flex-col pt-6 border border-r-black">
        <button><router-link :to="{ name: 'Dashboard' }">DASHBOARD</router-link></button>
        <button><router-link :to="{ name: 'Bookings' }">BOOKINGS</router-link></button>
        <button><router-link :to="{ name: 'Guests' }">GUESTS</router-link></button>
        <button @click="logOutUser">Log Out</button>
    </div>
</template>
