import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "Auth", component: () => import("../components/SessionManager.vue")},
    { path: "/dashboard", name: "Dashboard", component: () => import("../components/Dashboard.vue"), meta: { auth: true}}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
