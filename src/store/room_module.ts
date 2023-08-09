import {ActionContext} from "vuex";
import {Room} from "@/domain/entities/room";
import {loadRoomsUseCase} from "@/usecases/load_rooms_usecase";
import {loadMessagesUseCase} from "@/usecases/load_messages_usecase";
import {Message} from "@/domain/entities/message";
import {MessageWebsocket, WebSocketData, WebSocketObserver} from "@/repositories/websocket";
import {startMessageWebSocketUseCase} from "@/usecases/start_message_websocket_usecase";

class RoomState {
  rooms: Room[] = [];
  currentRoom: Room | null = null;
  roomMessages: Map<number, Message[] | null> = new Map();
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

  SET_CURRENT_ROOM(state: RoomState, room: Room): void {
    state.currentRoom = room;
  },

  SET_ROOM_MESSAGES(state: RoomState, {roomID, messages}: { roomID: number, messages: Message[] }): void {
    state.roomMessages.set(roomID, messages);
  },

  ADD_ROOM_MESSAGE(state: RoomState, {roomID, message}: { roomID: number, message: Message }): void {
    state.roomMessages?.get(roomID)?.push(message);
  },
};

class RoomObserver implements WebSocketObserver {
  private ctx: ActionContext<RoomState, RoomState>

  onmessage(messageEvent: MessageEvent): any {
    const {roomID, sender, text, createdAt} = JSON.parse(messageEvent.data);
    const message = new Message(sender, text, createdAt);
    this.ctx.commit("ADD_ROOM_MESSAGE", {roomID, message});
  }

  constructor(ctx: ActionContext<RoomState, RoomState>) {
    this.ctx = ctx;
  }
}

const actions = {
  startWebsocket: (ctx: ActionContext<RoomState, RoomState>) => {
    try {
      const currentRoom = ctx.state.currentRoom;
      if (!currentRoom) return;
      const messageWebSocket = startMessageWebSocketUseCase.Execute(currentRoom.id);
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

  setCurrentRoom: async (ctx: ActionContext<RoomState, RoomState>, room: Room) => {
    try {
      ctx.commit("SET_CURRENT_ROOM", room);
    } catch (e) {
      console.log("[actions] Error setCurrentRoom ", e);
      throw e;
    }
  },

  loadMessages: async (ctx: ActionContext<RoomState, RoomState>): Promise<void> => {
    try {
      const room = ctx.state.currentRoom;
      if (!room) return;
      const messages = (await loadMessagesUseCase.Execute(room.id) ?? []);
      ctx.commit("SET_ROOM_MESSAGES", {roomID: room.id, messages});
    } catch (e) {
      console.log("[actions] Error loadMessages ", e);
      throw e;
    }
  },

  sendMessage: async (ctx: ActionContext<RoomState, RoomState>, data: WebSocketData): Promise<void> => {
    try {
      console.log(ctx.state.webSocket)
      ctx.state.webSocket?.send(data);
    } catch (e) {
      console.log("[actions] Error sendMessage ", e);
      throw e;
    }
  },
};

const getters = {
  rooms: (state: RoomState): Room[] => state.rooms,
  currentRoom: (state: RoomState): Room | null => state.currentRoom,
  messages: (state: RoomState): Message[] | null => {
    const currentRoom = state.currentRoom;
    const messages: Message[] = [];
    console.log(currentRoom);
    if (!currentRoom) return messages;

    console.log("state.roomMessages", state.roomMessages)
    console.log("state.roomMessages[roomID]", state.roomMessages?.get(currentRoom.id))

    return state.roomMessages?.get(currentRoom.id) || messages;
  },
};

export default {
  namespaced: true,
  state: state,
  mutations,
  actions,
  getters
}