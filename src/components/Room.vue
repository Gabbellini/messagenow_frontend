<template>
  <div class="room-view" v-show="!roomID"></div>
  <div class="room-view room-view--chat" v-show="roomID">
    <ul>
      <li v-for="(message, index) of messages" :key="`message-${index}`">
        {{ message.sender.name }}
        {{ message.text }}
      </li>
    </ul>
    <MessageForm/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import {ComputedRef} from "vue";
import {Message} from "@/domain/entities/message";
import {useStore} from "vuex";
import MessageForm from "@/components/MessageForm.vue";

export default defineComponent({
  name: "RoomView",
  components: {MessageForm},
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
        console.log("[onMounted] Error ")
      }
    });

    const loadMessages = async (): Promise<void> => {
      await store.dispatch("room_module/loadMessages", parseInt(props.roomID))
    };

    const messages: ComputedRef<Message[]> = computed(() => store.getters["room_module/messages"]);
    return {
      messages
    }
  }
});

</script>

<style scoped>
.room-view {
  display: flex;
  flex: 1;
  background: #000000CC;
}

.room-view--chat {
  flex-direction: column;
}

.room-view--chat > ul {
  flex: 1;
  color: #fff;
}
</style>