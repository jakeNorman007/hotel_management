<script setup>
import DashboardIcon from "../assets/icons/DashboardIcon.vue";
import PeopleIcon from "../assets/icons/PeopleIcon.vue";
import RoomsIcon from "../assets/icons/RoomsIcon.vue";
import BookingsIcon from "../assets/icons/BookingsIcon.vue";
import LogoutIcon from "../assets/icons/LogoutIcon.vue";
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
    <div class="flex flex-col border border-r-black gap-6">
        <div class="font-semibold text-3xl flex justify-center mt-[3rem]">
            <h1>Hotel Management</h1>
        </div>
        <div class="flex flex-col gap-2 mt-[3rem]">
            <button class="flex justify-start items-center pl-5 py-3 font-semibold text-gray-600 hover:bg-green-200 hover:text-green-600 gap-2 mx-2">
                <DashboardIcon/>
                <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </button>
            <button class="flex justify-start items-center pl-5 py-3 font-semibold text-gray-600 hover:bg-green-200 hover:text-green-600 gap-2 mx-2">
                <PeopleIcon/>
                <router-link :to="{ name: 'Guests' }">Guests</router-link>
            </button>
            <button class="flex justify-start items-center pl-5 py-3 font-semibold text-gray-600 hover:bg-green-200 hover:text-green-600 gap-2 mx-2">
                <RoomsIcon/>
                <router-link :to="{ name: 'Rooms' }">Rooms</router-link>
            </button>
            <button class="flex justify-start items-center pl-5 py-3 font-semibold text-gray-600 hover:bg-green-200 hover:text-green-600 gap-2 mx-2">
                <BookingsIcon/>
                <router-link :to="{ name: 'Bookings' }">Bookings</router-link>
            </button>
            <button class="flex justify-start items-center pl-5 py-3 font-semibold text-gray-600 hover:bg-green-200 hover:text-green-600 gap-2 mx-2" @click="logOutUser">
                <LogoutIcon/>
                <p>Log Out</p>
            </button>
        </div>
    </div>
</template>
