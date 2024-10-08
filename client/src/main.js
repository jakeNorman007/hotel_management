import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { useSessionManagerStore } from "./store/index.js";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia)
app.use(router)

const authToken = localStorage.getItem("auth_token");

if (authToken && authToken !== "undefined") {
    const sessionStore = useSessionManagerStore();
    sessionStore.loginUserWithToken({ auth_token: authToken });
    app.mount("#app");
} else {
    app.mount("#app");
}
