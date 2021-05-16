import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: "/course",
    name: "Course",
    component: () => import("../components/Course.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../components/Test.vue"),
  },
  {
    path: "/admintest",
    name: "AdminTest",
    component: () => import("../components/AdminTest.vue"),
  },
  {
    path: "/admincourse",
    name: "AdminCourse",
    component: () => import("../components/AdminCourse.vue"),
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: () => import("../components/Statistic.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
