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
  <div v-if="editModalIsOpen" class="h-screen absolute bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="editModalIsOpen" class="fixed inset-0 z-[999] flex items-center justify-center">
        <form @submit="onEdit" class="flex flex-col gap-2 bg-white rounded-md">
          <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
            <p class="text-2xl font-semibold">Edit guest.</p>
          </div>
          <div class="pt-[3rem] px-[2rem]">
            <div class="flex flex-col gap-[2rem]">
              <div class="flex flex-col">
                <label class="text-gray-400">First name:</label>
                <input :placeholder="firstName" v-model="editedGuest.first_name" required class="focus:outline-none h-[3rem] w-[16rem] px-2 bg-gray-200 border-b-4 border-gray-400"/>
              </div>
              <div class="flex flex-col">
                <label class="text-gray-400">Last name:</label>
                <input :placeholder="lastName" v-model="editedGuest.last_name" required  class="focus:outline-none h-[3rem] w-[16rem] px-2 bg-gray-200 border-b-4 border-gray-400"/>
              </div>
              <div class="flex flex-col">
                <label class="text-gray-400">email:</label>
                <input :placeholder="email" v-model="editedGuest.email" required class="focus:none h-[3rem] w-[16rem] px-2 bg-gray-200 border-b-4 border-gray-400"/>
              </div>
            </div>
          </div>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-green-200 text-green-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-green-400">
              <p class="pl-3">Edit Guest</p>
            </button>
            <button type="button" @click="editModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:text-white w-[50%] py-[1rem] rounded-br-md hover:bg-gray-400">
              <p class="pr-3">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
