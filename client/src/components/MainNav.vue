<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <h1>Hi I am the nav bar</h1>
    <div class="flex gap-5">
        <router-link :to="{ name: 'Dashboard' }">DASHBOARD</router-link>
        <router-link :to="{ name: 'Bookings' }">BOOKINGS</router-link>
        <router-link :to="{ name: 'Guests' }">GUESTS</router-link>
    </div>
</template>
