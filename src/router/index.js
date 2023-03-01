import CreatePost from "@/views/CreatePost.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFound.vue";
import PostView from "../views/PostView.vue";
import ProfileView from "../views/ProfileView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/",
    name: "About",
    component: AboutView,
    meta: {
      title: "About",
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create post",
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: ProfileView,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/post/:id",
    name: "Post",
    component: PostView,
    meta: {
      title: "Post",
    },
  },
  {
    path: "*",
    name: "not-found",
    component: NotFoundView,
    meta: {
      title: "Not found",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  window.document.title = `${to.meta.title} | Pizza Blog`;
  next();
});

export default router;
