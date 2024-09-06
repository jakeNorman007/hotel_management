import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/auth", 
        name: "Auth",
        component: () => import("../views/SessionManager.vue")
    },
    { path: "/",
        component: () => import ("../views/Home.vue"),
        children: [
            { path: "/dashboard", 
                name: "Dashboard",
                component: () => import("../views/Dashboard.vue"),
            },
            {
                path: "/bookings",
                name: "Bookings",
                component: () => import("../views/Bookings.vue"),
            },
            {
                path: "/guests",
                name: "Guests",
                component: () => import("../views/Guests.vue"),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
