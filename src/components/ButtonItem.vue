<template>
  <button class="button" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: "ButtonItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin-top: 24px;
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  background: var(--background-variant);
  color: var(--primary);
  transition: all 0.05s ease-in-out;

  &:hover {
    color: var(--secondary);
    background: var(--primary);
  }

  &:disabled {
    background: var(--primary-transparent-50);
    cursor: not-allowed;
  }
}
</style>
