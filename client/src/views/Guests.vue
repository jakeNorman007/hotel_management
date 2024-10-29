<script setup>
import { ref, onMounted, computed } from "vue";
import EditGuestModal from "../components/EditGuestModal.vue";
import CreateGuestModal from "../components/CreateGuestModal.vue";
import DeleteGuestWarningModal from "../components/DeleteGuestWarningModal.vue";
import LeftArrow from "../assets/icons/LeftArrow.vue";
import RightArrow from "../assets/icons/RightArrow.vue";
import { getGuests } from "../services/guestsServices";

const guestsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const totalCount = ref(0);

const loadGuests = async (page) => {
  const data = await getGuests(page);

  if (data && data.meta) {
    guestsList.value = data.guests;
    totalPages.value = data.meta.total_pages;
    currentPage.value = data.meta.current_page;
    totalCount.value = data.meta.total_count;
  };
};

const hasPrevPage = computed(() => currentPage.value > 1);
const hasNextPage = computed(() => currentPage.value < totalPages.value);

const handleGuestAdd = (guest) => {
  guestsList.value.push({
    body: guest.Body,
  });
};

onMounted(async () => {
  loadGuests(currentPage.value);
});
</script>

<template>
  <div class="flex flex-col">
  <div class="flex justify-end items-center pr-[3rem] w-full h-[5rem] border-b border-black shadow-md shadow-gray-200">
    <div>
      <p>Welcome, user</p>
    </div>
  </div>
  <div class="mx-[3rem]">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-3xl">Guests</h1>
      <div class="flex items-center gap-4">
        <div v-if="!hasPrevPage">
          <div class="text-gray-200 py-2 px-4">
            <LeftArrow/>
          </div>
        </div>
        <div v-else>
          <button @click="loadGuests(currentPage - 1)" class="hover:bg-green-200 rounded-full py-2 px-4">
            <LeftArrow/>
          </button>
        </div>
        <div class="text-lg font-semibold">
          <p>{{ currentPage }} of {{ totalPages }} - {{ totalCount }} entries</p>
        </div>
        <div v-if="hasNextPage">
          <button @click="loadGuests(currentPage + 1)" class="hover:bg-green-200 rounded-full py-2 px-4">
            <RightArrow/>
          </button>
        </div>
        <div v-else>
          <div class="text-gray-200 py-2 px-4">
            <RightArrow/>
          </div>
        </div>
      </div>
      <CreateGuestModal @guest-added="handleGuestAdd"/>
    </div>
    <div class="grid grid-cols-5 px-3 py-[1rem] bg-gray-100 text-gray-600 border border-b-black border-t-white border-x-white font-semibold">
      <p>Id</p>
      <p>First Name</p>
      <p>Last Name</p>
      <p>Email</p>
    </div>
    <div>
      <ul v-for="(guest, index) in guestsList" :key="guest.id" class="grid grid-cols-5 items-center border border-b-black border-x-white px-3 py-[1rem]">
        <li>{{ guest.id }}</li>
        <li>{{ guest.first_name }}</li>
        <li>{{ guest.last_name }}</li>
        <li>{{ guest.email }}</li>
        <div class="flex gap-[1rem]">
          <EditGuestModal :guestId="guest?.id" :firstName="guest?.first_name" :lastName="guest?.last_name" :email="guest?.email"/>
          <DeleteGuestWarningModal :guestId="guest?.id"/>
        </div>
      </ul>
    </div>
  </div>
  </div>
</template>
