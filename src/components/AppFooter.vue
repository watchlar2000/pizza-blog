<template>
  <div class="footer">
    <a href="https://github.com/watchlar2000/pizza-blog" target="_black"
      >Source code on Github</a
    >
    &#169; <span>{{ fullYear }}</span>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    fullYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 14px 0;
  text-align: center;
  color: var(--secondary-color) !important;

  span {
    font-weight: 600;
  }
}
</style>
