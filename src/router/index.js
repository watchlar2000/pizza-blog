import CreatePost from "@/views/CreatePost.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
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
