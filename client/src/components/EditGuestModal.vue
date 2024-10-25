<script setup>
import { Teleport, ref } from "vue";
import { onGuestsUpdate } from "../services/guestsServices";

const props = defineProps(["guestId", "firstName", "lastName", "email"])

const editModalIsOpen = ref(false);
const editedGuest = ref({first_name: props.firstName, last_name: props.lastName, email: props.email});

const idToEdit = props.guestId;

const onEdit = async () => {
  try {
    const updatedGuest = await onGuestsUpdate(idToEdit, editedGuest.value);
  } catch(error) {
    console.error("Failed to update guest:", error);
  };
};
</script>

<template>
  <button @click="editModalIsOpen = true" class="bg-green-200 px-[2rem] font-semibold text-green-700 py-1 hover:bg-green-400 hover:text-white rounded-md">
    <p>Edit</p>
  </button>
  <div v-if="editModalIsOpen" class="h-screen fixed bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="editModalIsOpen" class="bg-white fixed z-[999] w-[50rem] h-[30rem] left-[25%] top-[25%]">
        <button @click="editModalIsOpen = false" class="bg-green-200 px-2 py-1 mx-2 my-2">Close modal</button>
        <form @submit="onEdit" class="flex flex-col pl-[2rem]">
          <label>First name:</label>
          <input :placeholder="firstName" v-model="editedGuest.first_name" required class="border border-black w-[20rem]"/>
          <label>Last name:</label>
          <input :placeholder="lastName" v-model="editedGuest.last_name" required  class="border border-black w-[20rem]"/>
          <label>email:</label>
          <input :placeholder="email" v-model="editedGuest.email" required class="border border-black w-[20rem]"/>
          <button type="submit">Edit Guest</button>
          <button type="button" @click="editModalIsOpen = false">Cancel edit</button>
        </form>
      </div>
    </Teleport>
  </div>
</template>
