<template>
  <p class="error"><slot /></p>
</template>

<script>
export default {
  name: "InputErrorMsg",
};
</script>

<style lang="scss" scoped>
.error {
  color: var(--error);
  font-weight: 500;
  font-size: 14px;
}
</style>
