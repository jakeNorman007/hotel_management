import { createRouter, createWebHistory } from "vue-router";
//import { useSessionManagerStore } from "../store";

const routes = [
    { path: "/auth", 
      name: "Auth",
      component: () => import("../views/SessionManager.vue")
    },
    { path: "/",
      component: () => import ("../views/Home.vue"),
      meta: { requiresAuth: true },
      children: [
        { path: "/dashboard", 
          name: "Dashboard",
          component: () => import("../views/Dashboard.vue"),
          //meta: { requiresAuth: true },
        },
        {
          path: "/bookings",
          name: "Bookings",
          component: () => import("../views/Bookings.vue"),
          //meta: { requiresAuth: true },
        },
        {
          path: "/guests",
          name: "Guests",
          component: () => import("../views/Guests.vue"),
          //meta: { requiresAuth: true },
        },
        {
          path: "/rooms",
          name: "Rooms",
          component: () => import("../views/Rooms.vue"),
          //meta: { requiresAuth: true },
        },
      ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/* router.beforeEach((to, from, next) => {
    const store = useSessionManagerStore();
    const isAuthenticated = store.isLoggedIn;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: "Auth" });
    } else {
        next();
    }
});*/

export default router;
