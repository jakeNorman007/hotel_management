<script setup>
import MainNav from "../components/MainNav.vue";
</script>

<template>
    <div class="h-screen grid grid-cols-[20rem_1fr]">
        <MainNav/>
        <router-view/>
    </div>
</template>
