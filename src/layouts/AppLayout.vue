<template>
  <div>
    <app-header class="header" />
    <a-row type="flex" justify="center" class="main">
      <a-col
        :xs="{ span: 22 }"
        :lg="{ span: 18 }"
        :xl="{ span: 14 }"
        :xxl="{ span: 10 }"
        ><slot
      /></a-col>
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
  margin-top: 25px;
}
</style>
