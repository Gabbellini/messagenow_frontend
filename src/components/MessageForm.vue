<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <input class="input input--message" type="text" id="message">
      <input class="input input--submit" type="submit"/>
    </fieldset>
  </form>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "MessageForm",
  props: {
    roomID: {
      type: Number,
      required: true,
    },
  },

  setup() {
    const store = useStore();

    const text = ref("");
    const onSubmit = async () => {
      try {
        await sendMessage();
      } catch (e) {
        console.log("[onSubmit] Error sendMessage ", e);
      }
    };

    const sendMessage = async (): Promise<void> => {
      try {
        await store.dispatch("room_module/sendMessage", text);
      } catch (e) {
        console.log("[onSubmit] Error dispatch ", e);
      }
    };

    return {
      text,
      onSubmit
    }
  },
});

</script>

<style scoped>
.input {
  height: 40px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border-radius: 2px;
}

fieldset {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
  box-shadow: -4px -2px 4px rgba(0, 0, 0, 0.1);
}

.input--submit {
  background: #532dff;
  color: #fff;
  min-width: 100px;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
}

.input--message {
  flex: 1;
  border: 1px solid rgba(255 255 255 / 10%);
  background: rgba(255 255 255 / 3%);
  color: #fff;
  padding: 1rem;
}

.input--message:focus {
  border: 1px solid rgba(255 255 255 / 100%);
  outline: none;
}
</style>