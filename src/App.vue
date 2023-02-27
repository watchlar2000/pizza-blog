<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import AppLayout from "./layouts/AppLayout.vue";
import { useUserStore } from "./store/user";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions(useUserStore, ["getCurrentUser"]),
  },
};
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
