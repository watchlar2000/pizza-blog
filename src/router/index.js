import Vue from "vue";
import VueRouter from "vue-router";
// import ArticleView from "../views/ArticleView.vue";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";

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
    path: "/profile/:id",
    name: "profile",
    component: ProfileView,
    meta: {
      title: "Profile",
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
