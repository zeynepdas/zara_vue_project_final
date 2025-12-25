<template>
  <button class="a-button" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'A_Button',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style scoped>
.a-button {
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  text-transform: uppercase;
}
</style>