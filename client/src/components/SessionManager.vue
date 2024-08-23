<script setup>
import { ref, computed } from "vue";
import { useSessionManagerStore } from "../store/index.js";

const signUpEmail = ref("");
const signUpPassword = ref ("");
const logInEmail = ref("");
const logInPassword = ref("");

const sessionManagerStore = useSessionManagerStore();
const isLoggedIn = computed(() => sessionManagerStore.isLoggedIn);
const getAuthToken = computed(() => sessionManagerStore.getAuthToken);
const getUserEmail = computed(() => sessionManagerStore.getUserEmail);
const getUserID = computed(() => sessionManagerStore.getUserID);

const logOutUser = () => {
    sessionManagerStore.logoutUser();
};

const onSignUp = (event) => {
    event.preventDefault();
    const data = {
        user: {
            email: signUpEmail.value,
            password: signUpPassword.value,
        },
    };
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
    <div v-if="isLoggedIn">
        <button @click="logOutUser">Logout</button>
        <p>You are loged in!</p>
        <p>{{ getUserID }}</p>
        <p>{{ getUserEmail }}</p>
        <p>{{ getAuthToken }}</p>
    </div>
    <div v-else>
        <h1>Sign Up!</h1>
        <form @submit="onSignUp">
            <input type="email" v-model="signUpEmail" placeholder="email"/>
            <input type="password" v-model="signUpPassword" placeholder="password"/>
            <input type="submit" value="Sign Up"/>
        </form>
        <h1>Log In!</h1>
        <form @submit="onLogin">
            <input type="text" v-model="logInEmail" placeholder="email"/>
            <input type="password" v-model="logInPassword" placeholder="password"/>
            <input type="submit" value="Login"/>
        </form>
    </div>
</template>
