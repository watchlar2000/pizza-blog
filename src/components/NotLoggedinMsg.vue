<template>
  <p class="text warning">
    To {{ msg }}, please
    <span @click="login" class="login-link">click here</span> to login.
  </p>
</template>

<script>
import { useUserStore } from "@/store/user";
import { mapActions } from "pinia";

export default {
  name: "NotLoggedinMsg",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useUserStore, ["login"]),
  },
};
</script>

<style lang="scss" scoped>
.warning {
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 100;
}

.login-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
