<script setup>
import { Teleport, ref } from "vue";
import AddIcon from "../assets/icons/AddIcon.vue";
import { onGuestsCreate } from "../services/guestsServices";

const createModalIsOpen = ref(false);
const guest = ref({first_name: "", last_name: "", email: ""});

const emit = defineEmits(["close", "guest-added"]);

const onSubmit = async() => {
  try {
    const response = await onGuestsCreate(guest.value);
    emit("guest-added", response);
    emit("close");
    guest.value = {first_name: "", last_name: "", email: ""};
  } catch(error) {
    console.error("failed to submit guest creation", error);
  };
};
</script>

<template>
  <button @click="createModalIsOpen = true" class="flex items-center gap-1 font-semibold text-green-800 bg-green-200 p-3 my-3 hover:bg-green-400 hover:text-white">
    <AddIcon/>
    <p>Create</p>
  </button>
  <div v-if="createModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="createModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
        <button @click="createModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
        <form @submit="onSubmit" class="flex flex-col pl-[2rem]">
          <label for="first_name">First name:</label>
          <input id="first_name" autocomplete="on" v-model="guest.first_name" placeholder="first name" required class="border border-black w-[20rem]"/>
          <label for="last_name">Last name:</label>
          <input id="last_name" autocomplete="on" v-model="guest.last_name" placeholder="last name" required class="border border-black w-[20rem]"/>
          <label for="email">Email:</label>
          <input id="email" autocomplete="on" v-model="guest.email" placeholder="email" required type="email" class="border border-black w-[20rem]"/>
          <button type="submit">Create Guest</button>
          <button type="button" @click="createModalIsOpen = false">Cancel</button>
        </form>
      </div>
    </Teleport>
  </div>
</template>
