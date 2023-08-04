<template>
  <div class="input-view">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
        :value="modelValue"
        :id="id"
        :type="type"
        v-bind="$attrs" @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "InputView",
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.input-view {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.input-view > input {
  padding: 0.2rem 0.5rem;
  height: 2rem;
}
</style>