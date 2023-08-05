import {http} from "@/repositories/http";
import {Room} from "@/domain/entities/room";
import {Message} from "@/domain/entities/message";

interface LoadMessagesRepository {
  Execute(roomID: number): Promise<Message[]>
}

class LoadMessagesRepositoryImpl implements LoadMessagesRepository {
  async Execute(roomID: number): Promise<Message[]> {
    try {
      const response = await http.get(`/rooms/${roomID}/messages`);
      return response.data;
    } catch (e) {
      console.log("[LoadMessagesRepositoryImpl] Error post ", e)
      throw e;
    }
  }
}

export const loadMessagesRepository = new LoadMessagesRepositoryImpl() as LoadMessagesRepository