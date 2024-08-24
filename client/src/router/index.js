import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "Auth", component: () => import("../components/SessionManager.vue"), },
    { path: "/Dasboard", name: "Dashboard", component: () => import("../components/Dashboard.vue"), }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
