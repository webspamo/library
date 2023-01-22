<template lang="">
  <button class="button">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "BaseButton",
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.button {
  padding: 0.3rem 0.8rem;
  font-size: 1rem;
  letter-spacing: 0.7px;
  text-align: center;
  background-color: #edd83d;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
