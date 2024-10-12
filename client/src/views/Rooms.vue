<script setup>
import { ref, onMounted, computed } from "vue";
import EditRoomModal from "../components/EditRoomModal.vue";
import CreateRoomModal from "../components/CreateRoomModal.vue";
import DeleteRoomWarningModal from "../components/DeleteRoomWarningModal.vue"; 
import { getRooms } from "../services/roomsServices";

const roomsList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);

const loadRooms = async (page) => {
  const data = await getRooms(page);

  if (data && data.meta) {
    roomsList.value = data.rooms;
    totalPages.value = data.meta.total_pages;
    currentPage.value = data.meta.current_page;
    totalCount.value = data.meta.total_count;
  };
};

const hasPrevPage = computed(() => currentPage.value > 1);
const hasNextPage = computed(() => currentPage.value < totalPages.value);

const handleRoomAdd = (room) => {
    roomsList.value.push({
        body: room.Body,
    });
};

onMounted(async () => {
  loadRooms(currentPage.value);
});
</script>

<template>
  <div class="m-[3rem]">
    <div class="flex justify-between">
      <h1 class="font-semibold text-3xl">Rooms</h1>
      <CreateRoomModal @room-added="handleRoomAdd"/>
    </div>
    <div class="grid grid-cols-6 px-3 py-[1rem] bg-gray-100 text-gray-600 border border-b-black border-t-white border-x-white font-semibold">
      <p>Id</p>
      <p>Name</p>
      <p>Price</p>
      <p>Capacity</p>
      <p>Description</p>
    </div>
    <div v-for="(room, index) in roomsList" :key="room.id" class="grid grid-cols-6 items-center border border-b-black border-x-white px-3 py-[1rem]">
      <p>{{ room.id }}</p>
      <p>{{ room.room_name }}</p>
      <p>{{ room.room_price }}</p>
      <p>{{ room.max_capacity }}</p>
      <p>{{ room.description_of_room}}</p>
      <div class="flex gap-2">
        <EditRoomModal :roomId="room?.id" :roomName="room?.room_name" :roomPrice="room?.room_price" :maxCapacity="room?.max_capacity" :descriptionOfRoom="room?.description_of_room"/>
        <DeleteRoomWarningModal :roomId="room?.id"/>
      </div>
    </div>
    <div class="flex justify-between mt-5">
      <button @click="loadRooms(currentPage - 1)" :disabled="!hasPrevPage" class="bg-green-200">Previous</button>
      <button @click="loadRooms(currentPage + 1)" :disabled="!hasNextPage" class="bg-green-200">Next</button>
      <p>Total guests: {{ totalCount }}</p>
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
    </div>
  </div>
</template>
