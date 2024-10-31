<script setup>
import { useRouter } from "vue-router";
import RoomsIcon from "../assets/icons/RoomsIcon.vue";
import LogoutIcon from "../assets/icons/LogoutIcon.vue";
import PeopleIcon from "../assets/icons/PeopleIcon.vue";
import { useSessionManagerStore } from "../store/index.js";
import BookingsIcon from "../assets/icons/BookingsIcon.vue";
import DashboardIcon from "../assets/icons/DashboardIcon.vue";

const router = useRouter();
const sessionManagerStore = useSessionManagerStore();

const logOutUser = () => {
  sessionManagerStore.logoutUser();
  router.push("/auth");
};
</script>

<template>
  <div class="flex flex-col border border-r-black shadow-lg shadow-gray-300">
    <div class="bg-gray-200 pb-[3rem]">
      <div class="font-semibold text-3xl flex flex-col justify-center mt-[3rem] ml-[4rem]">
        <p class="text-green-600">Swift Stay.</p>
        <p>Pro.</p>
      </div>
    </div>
    <div class="flex flex-col">
      <router-link :to="{ name: 'Dashboard' }" class="flex justify-start items-center pl-5 py-4 font-semibold text-gray-600 focus:bg-green-200 focus:text-green-600 hover:bg-green-200 hover:text-green-600 gap-2 border-y border-gray-200">
        <DashboardIcon/>
        <p>Dashboard</p>
      </router-link>
      <router-link :to="{ name: 'Guests' }" class="flex justify-start items-center pl-5 py-4 font-semibold text-gray-600 focus:bg-green-200 focus:text-green-600 hover:bg-green-200 hover:text-green-600 gap-2 border-b border-gray-200">
        <PeopleIcon/>
        <p>Guests</p>
      </router-link>
      <router-link :to="{ name: 'Rooms' }"class="flex justify-start items-center pl-5 py-4 font-semibold text-gray-600 focus:bg-green-200 focus:text-green-600 hover:bg-green-200 hover:text-green-600 gap-2 border-b border-gray-200">
        <RoomsIcon/>
        <p>Rooms</p>
      </router-link>
      <router-link :to="{ name: 'Bookings' }" class="flex justify-start items-center pl-5 py-4 font-semibold text-gray-600 focus:bg-green-200 focus:text-green-600 hover:bg-green-200 hover:text-green-600 gap-2 border-b border-gray-200">
        <BookingsIcon/>
        <p>Bookings</p>
      </router-link>
      <button class="flex justify-start items-center px-5 py-4 font-semibold text-gray-600 hover:bg-green-200 hover:text-green-600 gap-2 border-b border-gray-200" @click="logOutUser">
        <LogoutIcon/>
        <p>Log Out</p>
      </button>
    </div>
  </div>
</template>
