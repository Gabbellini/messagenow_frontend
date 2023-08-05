import {ActionContext} from "vuex";
import {Room} from "@/domain/entities/room";
import {loadRoomsUseCase} from "@/usecases/load_rooms_usecase";
import {loadMessagesUseCase} from "@/usecases/load_messages_usecase";
import {Message} from "@/domain/entities/message";
import {sendMessageUseCase} from "@/usecases/send_message_usecase";
import MessageBox from "@/components/MessageBox.vue";

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
      const rooms: Room[] = await loadRooms();
      commit("SET_ROOMS", rooms);
    } catch (e) {
      console.log("[actions] Error loadRooms ", e);
      throw e;
    }
  },

  loadMessages: async ({commit}: ActionContext<RoomState, RoomState>, roomID: number): Promise<void> => {
    try {
      const messages = await loadMessages(roomID);
      commit("SET_ROOM_MESSAGES", messages);
    } catch (e) {
      console.log("[actions] Error loadMessages ", e);
      throw e;
    }
  },

  sendMessage: async ({commit}: ActionContext<RoomState, RoomState>, {
    roomID,
    message
  }: { roomID: number, message: string }): Promise<void> => {
    try {
      await sendMessage(roomID, message);
    } catch (e) {
      console.log("[actions] Error sendMessage ", e);
      throw e;
    }
  },
};

const loadRooms = async (): Promise<Room[]> => {
  try {
    return await loadRoomsUseCase.Execute();
  } catch (e) {
    console.log("[actions] Error loadRoomsUseCase ", e)
    throw e;
  }
};

const loadMessages = async (roomID: number): Promise<Message[]> => {
  try {
    return await loadMessagesUseCase.Execute(roomID);
  } catch (e) {
    console.log("[actions] Error loadMessagesUseCase ", e)
    throw e;
  }
};

const sendMessage = async (roomID: number, message: string): Promise<void> => {
  try {
    await sendMessageUseCase.Execute(roomID, message);
  } catch (e) {
    console.log("[actions] Error sendMessageUseCase ", e)
    throw e;
  }
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