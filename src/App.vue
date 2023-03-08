<template>
  <div id="app">
    <app-layout class="wrapper">
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import AppLayout from "./layouts/AppLayout.vue";
import { useCommentStore } from "./store/comment";
import { usePostStore } from "./store/post";
import { useUserStore } from "./store/user";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  mounted() {
    this.getLoggedinUser();
    this.getPostsList();
  },
  methods: {
    ...mapActions(useUserStore, ["getLoggedinUser"]),
    ...mapActions(usePostStore, ["getPostsList"]),
    ...mapActions(useCommentStore, ["getCommentsList"]),
  },
};
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
