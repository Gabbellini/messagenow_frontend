<template>
  <div class="home">
    <ContainerView class="container-view">
      <RoomList/>
      <RoomView :room-i-d="roomID" v-if="roomID"/>
    </ContainerView>
  </div>
</template>

<script lang="ts">
import ContainerView from "@/components/ContainerView.vue";
import {defineComponent} from "vue";
import RoomList from "@/components/RoomList.vue";
import RoomView from "@/components/Room.vue";

export default defineComponent({
  name: 'HomeView',
  components: {RoomView, RoomList, ContainerView},
  props: {
    roomID: {
      required: true,
      type: String,
    }
  },

});
</script>

<style scoped>
.home {
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 1rem;
  box-sizing: border-box;
}

.container-view {
  display: flex;
  height: 800px;
  padding: 0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.form__container > h1 {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
}

.form__container > h1 > strong {
  font-weight: bold;
}
</style>