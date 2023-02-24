<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
};
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
