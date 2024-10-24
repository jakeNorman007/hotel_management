<script setup>
import { Teleport, ref } from "vue";
import AddIcon from "../assets/icons/AddIcon.vue";
import { onBookingsCreate } from "../services/bookingsServices";

const createModalIsOpen = ref(false);
const booking = ref({number_of_nights: "", number_of_guests: "", status: "", room_id: "", guest_id: ""});

const emit = defineEmits(["close", "booking-added"]);

const onSubmit = async() => {
  try {
    const response = await onBookingsCreate(booking.value);
    emit("booking-added", response);
    emit("close");
    booking.value = {number_of_nights: "", number_of_guests: "", status: "", room_id: "", guest_id: ""};
  } catch(error) {
    console.error("failed to submit booking creation", error);
  };
};
</script>

<template>
  <button @click="createModalIsOpen = true" class="flex items-center gap-1 font-semibold text-green-800 bg-green-200 p-3 my-3 hover:bg-green-400 hover:text-white rounded-md">
    <AddIcon/>
    <p>Add Booking</p>
  </button>
  <div v-if="createModalIsOpen" class="h-screen absolute bg-black z-[998] w-full left-0 top-0 opacity-25">
    <Teleport to="body">
      <div v-if="createModalIsOpen" class="fixed bg-white z-[999] h-fit w-fit top-[25%] left-[32%] bottom-[50%] flex items-center justify-center rounded-md">
        <form @submit="onSubmit" class="flex flex-col gap-2">
            <div class="flex justify-center rounded-t-md py-[2rem] bg-green-200 border-4 border-white">
              <p class="text-2xl font-semibold">Create a new booking.</p>
            </div>
          <div class="pt-[3rem] px-[2rem]">
            <div class="flex gap-[2rem]">
              <div>
                <label for="nights">
                  <p class="text-gray-400">Number of nights:</p>
                </label>
                <input id="nights" autocomplete="on" v-model="booking.number_of_nights" required class="text-lg h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
              <div>
                <label for="guests">
                  <p class="text-gray-400">Number of guests:</p>
                </label>
                <input id="guests" autocomplete="on" v-model="booking.number_of_guests" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
            </div>
            <div class="flex gap-[2rem] py-5">
              <div>
                <label for="status">
                  <p class="text-gray-400">Room status:</p>
                </label>
                <select id="status"v-model="booking.status" name="status" required class="h-[3rem] w-[16rem] border border-gray-400 rounded-md">
                  <option value="null">-</option>
                  <option value="occupied">occupied</option>
                  <option value="unoccupied">unoccupied</option>
                </select>
              </div>
              <div>
                <label for="paid">
                  <p class="text-gray-400">Is paid:</p>
                </label>
                <select id="paid" v-model="booking.is_paid" name="is_paid" required class="h-[3rem] w-[16rem] border border-gray-400 rounded-md">
                  <option value="null">-</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>
            <div class="flex gap-[2rem]">
              <div>
                <label for="room_id">
                  <p class="text-gray-400">Room number:</p>
                </label>
                <input id="room_id" autocomplete="on" v-model="booking.room_id" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
              <div>
                <label for="guest_id">
                  <p class="text-gray-400">Guest number:</p>
                </label>
                <input id="guest_id" autocomplete="on" v-model="booking.guest_id" required class="h-[3rem] w-[16rem] px-2 border border-gray-400 rounded-md"/>
              </div>
            </div>
          </div>
          <div class="flex mt-[3rem]">
            <button type="submit" class="flex justify-start bg-green-200 text-green-800 hover:text-white w-[50%] py-[1rem] rounded-bl-md hover:bg-green-400">
              <p class="pl-3">Create</p>
            </button>
            <button type="button" @click="createModalIsOpen = false" class="flex justify-end bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white w-[50%] py-[1rem] rounded-br-md">
              <p class="pr-3 ">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </div>
</template>
