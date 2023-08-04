<template>
  <ol class="rooms">
    <li @click="onClick(index, room)" class="room" v-for="(room, index) of rooms" :key="`room-${index}`">
      <h2>Participantes</h2>
      <ul class="room__users">
        <li class="room__user" v-for="(user, index) of room.users" :key="`user-${index}`">
          {{ user.name }}
        </li>
      </ul>
    </li>
  </ol>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {computed, ComputedRef, defineComponent, onMounted} from "vue";
import {Room} from "@/domain/entities/room";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "RoomList",

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(async (): Promise<void> => {
      try {
        await loadRooms();
      } catch (e) {
        console.log("[loadRooms] Error dispatch ", e);
        alert(e);
      }
    });

    const loadRooms = async (): Promise<void> => {
      try {
        await store.dispatch("room_module/loadRooms");
      } catch (e) {
        console.log("[loadRooms] Error dispatch ", e)
        throw e;
      }
    }

    const rooms: ComputedRef<Room[]> = computed(() =>
        store.getters["room_module/rooms"]);

    const onClick = async (index: number, room: Room): Promise<void> => {
      try {
        await router.push({name: "rooms", params: {roomID: room.id}})
      } catch (e) {
        console.log("[onClick] Error loadRoom ", e);
        alert(e);
      }
    };

    return {
      rooms,
      onClick,
    }
  }
});
</script>

<style scoped>
.rooms {
  width: 40%;
  background-image: url("../../src/assets/login/background.png");
  background-color: #000000CC;
  background-blend-mode: color;
  background-size: cover;
  background-position: left;
}

.room {
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  cursor: pointer;
}

.room__users {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.room > h2 {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.room__users {
  font-size: 0.8rem;
}
</style>