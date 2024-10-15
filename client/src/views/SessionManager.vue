<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import { useSessionManagerStore } from "../store/index.js";

const router = useRouter();

const isSignedUp = ref(false);
const signUpEmail = ref("");
const signUpPassword = ref ("");
const logInEmail = ref("");
const logInPassword = ref("");

const sessionManagerStore = useSessionManagerStore();

const isLoggedIn = computed(() => sessionManagerStore.isLoggedIn);
const getAuthToken = computed(() => sessionManagerStore.getAuthToken);
const getUserEmail = computed(() => sessionManagerStore.getUserEmail);
const getUserID = computed(() => sessionManagerStore.getUserID);

const onSignUp = (event) => {
  event.preventDefault();
  const data = {
    user: {
      email: signUpEmail.value,
      password: signUpPassword.value,
    },
  };
  router.push("/dashboard");
  sessionManagerStore.registerUser(data);
  resetData();
};

const onLogin = (event) => {
  event.preventDefault();
  const data = {
    user: {
      email: logInEmail.value,
      password: logInPassword.value,
    },
  };
  router.push("/dashboard");
  sessionManagerStore.loginUser(data);
  resetData();
};

const resetData = () => {
  signUpEmail.value = "";
  signUpPassword.value = "";
  logInEmail.value = "";
  logInPassword.value = "";
};
</script>

<template>
  <div class="h-screen grid grid-cols-2">
    <div v-if="isSignedUp" class="h-screen content-center">
      <div class="border border-black m-[8rem] p-[2rem]">
        <form @submit="onSignUp" class="flex flex-col p-[2rem] gap-[1rem]">
          <h1>Sign Up!</h1>
          <input required id="sign_up_email" type="email" v-model="signUpEmail" placeholder="example@email.com"
            class="p-1 border border-black"/>
          <input required id="sign_up_password" type="password" v-model="signUpPassword" placeholder="password"
            class="p-1 border border-black"/>
          <button id="sign_up_submit" type="submit" class="p-1 bg-gray-100">Sign up</button>
        </form>
        <div class="flex gap-1 justify-center"> 
          <p>Already have an account?</p>
          <button @click="isSignedUp = false;" class="underline">Log In!</button>
        </div>
      </div>
    </div>
    <div v-else class="h-screen content-center">
      <div class="border border-black m-[8rem] p-[2rem]">
        <form @submit="onLogin" class="flex flex-col p-[2rem] gap-[1rem]">
          <h1>Log In!</h1>
          <input required id="log_in_email" type="text" v-model="logInEmail" placeholder="example@email.com"
            class="p-1 border border-black"/>
          <input required id="log_in_password" type="password" v-model="logInPassword" placeholder="password"
            class="p-1 border border-black"/>
          <button id="log_in_submit" type="submit" class="p-1 bg-gray-100">Log in</button>
        </form>
        <div class="flex gap-1 justify-center">
          <p>Don't have an account?</p>
          <button @click="isSignedUp = true" class="underline">Sign Up!</button>
        </div>
      </div>
    </div>
    <div class="content-center m-[4rem]">
      <div class="flex flex-col gap-3">
        <h1 class="text-4xl">Welcome in.</h1>
        <p><p class="font-semibold">SwiftStay Pro</p>The ultimate hotel management software designed for unparalleled 
        simplicity and speed. With its intuitive interface and streamlined workflow, SwiftStay Pro  ensures guests 
        experience effortless check-ins and check-outs, minimizing wait times and maximizing efficiency. By delving 
        into automation and real-time updates, this system empowers hotel staff to focus on delivering exceptional 
        service, making every guest’s stay smooth and hassle-free.</p>
        <p class="text-2xl">Let's get you checked in.</p>
      </div>
    </div>
  </div>
</template>
