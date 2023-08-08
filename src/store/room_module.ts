import {ActionContext} from "vuex";
import {Room} from "@/domain/entities/room";
import {loadRoomsUseCase} from "@/usecases/load_rooms_usecase";
import {loadMessagesUseCase} from "@/usecases/load_messages_usecase";
import {Message} from "@/domain/entities/message";
import {sendMessageUseCase} from "@/usecases/send_message_usecase";
import {WebSocketData} from "@/repositories/websocket";
import {startMessageWebSocketUseCase} from "@/usecases/start_message_websocket_usecase";

class RoomState {
  rooms: Room[] = [];
  messages: Message[] = [];
}

const state = new RoomState();

const mutations = {
  SET_ROOMS(state: RoomState, rooms: Room[]): void {
    state.rooms = rooms;
  },

  SET_ROOM_MESSAGES(state: RoomState, messages: Message[]): void {
    state.messages = messages;
  }
};

const actions = {
  loadRooms: async ({commit}: ActionContext<RoomState, RoomState>) => {
    try {
      const rooms: Room[] = await loadRoomsUseCase.Execute();
      commit("SET_ROOMS", rooms);
    } catch (e) {
      console.log("[actions] Error loadRooms ", e);
      throw e;
    }
  },

  loadMessages: async ({commit}: ActionContext<RoomState, RoomState>, roomID: number): Promise<void> => {
    try {
      const messages = await loadMessagesUseCase.Execute(roomID);
      commit("SET_ROOM_MESSAGES", messages);
    } catch (e) {
      console.log("[actions] Error loadMessages ", e);
      throw e;
    }
  },

  sendMessage: async (ctx: ActionContext<RoomState, RoomState>, data: WebSocketData): Promise<void> => {
    try {
      await sendMessageUseCase.Execute(data);
    } catch (e) {
      console.log("[actions] Error sendMessage ", e);
      throw e;
    }
  },
};

const getters = {
  rooms: (state: RoomState): Room[] => state.rooms,
  messages: (state: RoomState): Message[] => state.messages,
};

export default {
  namespaced: true,
  state: state,
  mutations,
  actions,
  getters
}