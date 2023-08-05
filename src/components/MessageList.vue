<template>
  <ul class="message-list">
    <li
        v-for="(message, index) of messages"
        :key="`message-${index}`"
        :class="['message', message.sender.id !== user.id ? 'left' : 'right'] "
    >
      <MessageBox :image-position="message.sender.id !== user.id ? 'left' : 'right'">
        <template #image>
          <img class="message__img" :src="message.sender.image" width="30" height="30" alt="">
        </template>
        <template #header>
          <span class="message__date">{{ new Date(Date.parse(message.createdAt)).toLocaleString() }}</span>
          <span class="message__user-name">{{ message.sender.name }}</span>
        </template>
        <template #body>
          <p class="message__text">{{ message.text }}</p>
        </template>
      </MessageBox>
    </li>
  </ul>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import {ComputedRef} from "vue";
import {Message} from "@/domain/entities/message";
import {useStore} from "vuex";
import MessageBox from "@/components/MessageBox.vue";
import {User} from "@/domain/entities/user";

export default defineComponent({
  name: "MessageList",
  components: {MessageBox},
  props: {
    roomID: {
      type: String,
      required: true
    },
  },

  setup(props) {
    const store = useStore();

    onMounted(async (): Promise<void> => {
      try {
        await loadMessages();
      } catch (e) {
        console.log("[onMounted] Error ", e);
      }
    });

    const loadMessages = async (): Promise<void> => {
      await store.dispatch("room_module/loadMessages", parseInt(props.roomID))
    };

    const user: ComputedRef<User> = computed(() => store.getters["authorization_module/user"]);

    const messages: ComputedRef<Message[]> = computed(() => store.getters["room_module/messages"]);
    return {
      user,
      messages
    }
  }
});

</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  color: #fff;
  padding: 1rem;
  box-sizing: border-box;
  background: #000000CC;
}

.message.right {
  align-self: flex-end;
}

.message__img {
  order: 0;
}

.message__img {
  border-radius: 50%;
}

</style>