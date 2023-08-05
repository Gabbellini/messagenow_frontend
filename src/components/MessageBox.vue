<template>
  <div class="message-box">
    <div :class="['message__image', imagePosition]">
      <slot name="image"/>
    </div>
    <div class="message-box__container">
      <header class="message__header">
        <slot name="header"/>
      </header>
      <div class="message__body">
        <slot name="body"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "MessageBox",
  props: {
    imagePosition: {
      default: "left",
      type: String as PropType<"left" | "right">
    }
  }
});

</script>

<style scoped>
.message-box {
  display: flex;
  gap: 0.5rem;
}

.message-box__container {
  background: #3378b0;
  padding: 1rem;
  border-radius: 4px;
}

.message__header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-size: 1rem;
  gap: 0.2rem;
}

.message__image.right {
  order: 1;
}
</style>