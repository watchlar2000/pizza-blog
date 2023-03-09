<template>
  <input
    type="text"
    :value="value"
    @input="updateValue($event.target.value)"
    :placeholder="placeholder"
    class="input"
  />
</template>

<script>
export default {
  name: "InputItem",
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
}
</style>
