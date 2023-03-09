<template>
  <div class="layout">
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
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import { usePostStore } from "@/store/post";
import { mapState } from "pinia";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapState(usePostStore, ["postAddedMsg"]),
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  margin: 35px 0;
  flex: 1;
}
</style>
