import {ActionContext} from "vuex";
import {Room} from "@/domain/entities/room";
import {loadRoomsUseCase} from "@/usecases/load_rooms_usecase";
import {loadMessagesUseCase} from "@/usecases/load_messages_usecase";
import {Message} from "@/domain/entities/message";
import {MessageWebsocket, WebSocketData, WebSocketObserver} from "@/repositories/websocket";
import {startMessageWebSocketUseCase} from "@/usecases/start_message_websocket_usecase";

class RoomState {
  rooms: Room[] = [];
  messages: Message[] = [];
  webSocket: MessageWebsocket | null = null;
}


const state = new RoomState();

const mutations = {
  SET_WEBSOCKET(state: RoomState, webSocket: MessageWebsocket) {
    state.webSocket = webSocket;
  },

  SET_ROOMS(state: RoomState, rooms: Room[]): void {
    state.rooms = rooms;
  },

  SET_ROOM_MESSAGES(state: RoomState, messages: Message[]): void {
    state.messages = messages;
  },

  ADD_ROOM_MESSAGE(state: RoomState, message: Message): void {
    state.messages.push(message);
  },
};

class RoomObserver implements WebSocketObserver {
  private ctx: ActionContext<RoomState, RoomState>

  onmessage(messageEvent: MessageEvent): any {
    console.log(JSON.parse(messageEvent.data))
    const {sender, text, createdAt} = JSON.parse(messageEvent.data);
    this.ctx.commit("ADD_ROOM_MESSAGE", new Message(sender, text, createdAt));
  }

  constructor(ctx: ActionContext<RoomState, RoomState>) {
    this.ctx = ctx;
  }
}

const actions = {
  startWebsocket: (ctx: ActionContext<RoomState, RoomState>, roomID: number) => {
    try {
      const messageWebSocket = startMessageWebSocketUseCase.Execute(roomID);
      messageWebSocket.subscribe(new RoomObserver(ctx))
      ctx.commit("SET_WEBSOCKET", messageWebSocket);
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
      ctx.state.webSocket?.send(data);
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