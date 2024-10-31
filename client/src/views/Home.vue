<script setup>
import MainNav from "../components/MainNav.vue";
import TopBar from "../components/TopBar.vue";
</script>

<template>
  <div class="h-screen grid grid-cols-[18rem_1fr]">
    <MainNav/>
    <div>
      <TopBar/>
      <router-view/>
    </div>
  </div>
</template>
