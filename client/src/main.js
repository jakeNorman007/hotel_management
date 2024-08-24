import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { useSessionManagerStore } from "./store/index.js";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router)
app.use(pinia)

let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefined" && auth_token !== null;
  if (authTokenExists) {
    const sessionStore = useSessionManagerStore();
    sessionStore.loginUserWithToken({ auth_token });
  }
}

app.mount('#app')
