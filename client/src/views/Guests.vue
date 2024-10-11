<script setup>
import { ref, onMounted, computed } from "vue";
import EditGuestModal from "../components/EditGuestModal.vue";
import CreateGuestModal from "../components/CreateGuestModal.vue";
import DeleteGuestWarningModal from "../components/DeleteGuestWarningModal.vue";
import { getGuests } from "../services/guestsServices";

const guestsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);

const loadGuests = async (page) => {
  const data = await getGuests(page);
  console.log(data);
  guestsList.value = data.guests;
  console.log(data.guests);
  totalPages.value = data.meta.total_pages;
  currentPage.value = data.meta.current_page;
  totalCount.value = data.meta.total_count;
};

const hasPrevPage = computed(() => currentPage.value > 1);
const hasNextPage = computed(() => currentPage.value < totalPages.value);

const handleGuestAdd = (guest) => {
    guestsList.value.push({
        body: guest.Body,
    });
};

onMounted(async () => {
  console.log("Mounted");
  loadGuests(currentPage.value);
});

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
    <ul v-for="(guest, index) in guestsList" :key="guest.id" class="grid grid-cols-5 border border-b-black border-x-white px-3 py-[1rem]">
      <li>{{ guest.id }}</li>
      <li>{{ guest.first_name }}</li>
      <li>{{ guest.last_name }}</li>
      <li>{{ guest.email }}</li>
      <div class="flex static gap-[1rem]">
        <EditGuestModal :guestId="guest?.id" :firstName="guest?.first_name" :lastName="guest?.last_name" :email="guest?.email"/>
        <DeleteGuestWarningModal :guestId="guest?.id"/>
      </div>
    </ul>
    <div class="flex">
      <button @click="loadGuests(currentPage - 1)" :disabled="!hasPrevPage">Previous</button>
      <button @click="loadGuests(currentPage + 1)" :disabled="!hasNextPage">Next</button>
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
      <p>Total Posts: {{ totalCount }}</p>
    </div>
  </div>
</template>
