<template>
  <div class="message-view" v-if="roomID">
    <MessageList class="message-view__list" :room-i-d="roomID"/>
    <MessageForm class="message-view__form" :room-i-d="roomID"/>
  </div>
  <div class="message-view message-view--fallback" v-else></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MessageForm from "@/components/MessageForm.vue";
import MessageList from "@/components/MessageList.vue";

export default defineComponent({
  name: "MessageView",
  components: {MessageList, MessageForm},
  props: {
    roomID: {
      type: String,
    }
  }
})
</script>

<style scoped>
.message-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.message-view__list {
  flex: 1;
}
</style>