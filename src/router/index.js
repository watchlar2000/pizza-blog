import Vue from "vue";
import VueRouter from "vue-router";
// import ArticleView from "../views/ArticleView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: {
      title: "Signup",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  window.document.title = `${to.meta.title} | Pizza Blog`;
  // console.log(to, from);
  next();
});

export default router;
