<template>
  <div>
    <app-header class="header" />

    <a-row class="main">
      <!-- <a-col :span="12" :offset="6"> <slot /></a-col> -->
      <a-col class="content"> <slot /></a-col>
    </a-row>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 20px;
}

.content {
  margin-top: 25px;
}
</style>
