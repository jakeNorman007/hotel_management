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
  <button @click="createModalIsOpen = true" class="flex items-center gap-1 font-semibold text-green-800 bg-green-200 p-3 my-3 hover:bg-green-400 hover:text-white rounded-md">
    <AddIcon/>
    <p>Create</p>
  </button>
  <div v-if="createModalIsOpen" class="h-screen absolute bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="createModalIsOpen" class="fixed inset-0 z-[999] flex items-center justify-center">
        <form @submit="onSubmit" class="flex flex-col gap-2 bg-white rounded-md">
          <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
            <p class="text-2xl font-semibold">Create a new guest.</p>
          </div>
          <div class="pt-[3rem] px-[2rem]">
            <div class="flex flex-col gap-[2rem]">
              <div>
                <label for="first_name">
                  <p class="text-gray-400">First name:</p>
                </label>
                <input id="first_name" autocomplete="on" v-model="guest.first_name" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
              <div>
                <label for="last_name">
                  <p class="text-gray-400">Last name:</p>
                </label>
                <input id="last_name" autocomplete="on" v-model="guest.last_name" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
              <div>
                <label for="email">
                  <p class="text-gray-400">Email:</p>
                </label>
                <input id="email" autocomplete="on" v-model="guest.email" required type="email" class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
            </div>
          </div>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-green-200 text-green-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-green-400">
              <p class="pl-3">Create Guest</p>
            </button>
            <button type="button" @click="createModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:text-white w-[50%] py-[1rem] rounded-br-md hover:bg-gray-400">
              <p class="pr-3">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
