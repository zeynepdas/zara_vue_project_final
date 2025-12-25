<template>
  <input
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="a-input-text"
  />
</template>

<script>
export default {
  name: 'A_InputText',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.a-input-text {
  border: 1px solid #ccc;
  padding: 8px 10px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}
</style>
