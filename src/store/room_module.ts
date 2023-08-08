import {ActionContext} from "vuex";
import {Room} from "@/domain/entities/room";
import {loadRoomsUseCase} from "@/usecases/load_rooms_usecase";
import {loadMessagesUseCase} from "@/usecases/load_messages_usecase";
import {Message} from "@/domain/entities/message";
import {WebSocketData, WebSocketObserver} from "@/repositories/websocket";
import {startMessageWebSocketUseCase} from "@/usecases/start_message_websocket_usecase";

class RoomState implements WebSocketObserver {
  rooms: Room[] = [];
  messages: Message[] = [];
  send: ((webSocketData: WebSocketData) => any) | null = null;
  onmessage = (messageEvent: MessageEvent) => {
    this?.messages.push(messageEvent.data);
  }
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
  startWebsocket: ({commit}: ActionContext<RoomState, RoomState>, roomID: number) => {
    try {
      const messageWebSocket = startMessageWebSocketUseCase.Execute(roomID);
      messageWebSocket.subscribe(state);
      commit("SET_MESSAGE_SENDER", messageWebSocket.send);
    } catch (e) {
      console.log("[actions] Error loadRooms ", e);
      throw e;
    }
  },

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
      const send = ctx.state.send;
      if (send) send(data);
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