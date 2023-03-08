<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "LoaderItem",
};
</script>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  width: 64px;
  height: 64px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 8px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-color: var(--primary) transparent;
    animation: loader 0.75s linear infinite;
  }
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
