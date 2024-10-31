<script setup>
import SearchIcon from "../assets/icons/SearchIcon.vue";
</script>

<template>
  <div class="flex justify-between items-center pr-[3rem] w-full h-[5rem] border-b border-black shadow-md shadow-gray-200">
    <div class="flex items-center">
      <div class="ml-[2rem] px-2 py-[0.36rem] bg-gray-200 border-b-4 border-gray-400 rounded-l-full">
        <SearchIcon />
      </div>
      <input placeholder="search" class="py-4 bg-gray-200 w-[40rem] h-[2rem] focus:outline-none rounded-r-full border-b-4 border-gray-400">
    </div>
    <div>
      <p>Welcome, user</p>
    </div>
  </div>
</template>
