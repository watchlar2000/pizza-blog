<template>
  <div class="back" @click.self="closePostAddedMsg">
    <div class="message">
      <h3 class="title">Added successfully</h3>
      <div>
        <a-icon class="success" type="check" />
      </div>
      <div class="controls">
        <router-link
          class="link go-to"
          :to="{ name: 'Home' }"
          @click="closePostAddedMsg"
          >Go to posts list</router-link
        >
        <button class="link" @click="closePostAddedMsg">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/store/post";
import { mapActions } from "pinia";

export default {
  name: "SuccessMsg",
  methods: {
    ...mapActions(usePostStore, ["closePostAddedMsg"]),
  },
};
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  background: var(--primary-transparent-50);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
.message {
  text-align: center;
  width: 75%;
  max-width: 400px;
  z-index: 50;
  font-family: "Poppins";
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: white;
  padding: 24px;

  .controls {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    .link {
      padding: 8px 18px;
      border: 2px solid var(--primary);
      color: var(--primary) !important;
      transition: none;

      &:hover {
        color: var(--secondary) !important;
        background: var(--primary);
      }
    }

    .go-to:hover {
      background: var(--surface);
    }
  }

  .success {
    margin-top: 16px;
    font-size: 40px;
    color: var(--success);
  }
}
</style>
