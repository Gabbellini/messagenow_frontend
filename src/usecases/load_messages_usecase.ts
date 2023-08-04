import {http} from "@/repositories/http";
import {Room} from "@/domain/entities/room";
import {Message} from "@/domain/entities/message";
import {loadMessagesRepository} from "@/repositories/load_messages_repository";

interface LoadMessagesUseCase {
  Execute(roomID: number): Promise<Message[]>
}

class LoadMessagesUseCaseImpl implements LoadMessagesUseCase {
  async Execute(roomID: number): Promise<Message[]> {
    try {
      return await loadMessagesRepository.Execute(roomID);
    } catch (e) {
      console.log("[LoadMessagesUseCaseImpl] Error Execute ", e)
      throw e;
    }
  }
}

export const loadMessagesUseCase = new LoadMessagesUseCaseImpl() as LoadMessagesUseCase