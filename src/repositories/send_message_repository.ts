import {User} from "@/domain/entities/user";
import {http} from "@/repositories/http";

interface SendMessageRepository {
  Execute(roomID: number, message: string): Promise<User>
}

class SendMessageRepositoryImpl implements SendMessageRepository {
  Execute(roomID: number, message: string): Promise<User> {
    try {
      return http.post(`/rooms/${roomID}/ws`, message);
    } catch (e) {
      console.log("[SendMessageRepositoryImpl] Error Execute ", e);
      throw e;
    }
  }
}

export const sendMessageRepository = new SendMessageRepositoryImpl() as SendMessageRepository;