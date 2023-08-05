import {User} from "@/domain/entities/user";
import {sendMessageRepository} from "@/repositories/send_message_repository";

interface SendMessageUseCase {
  Execute(roomID: number, message: string): Promise<User>
}

class SendMessageUseCaseImpl implements SendMessageUseCase {
  Execute(roomID: number, message: string): Promise<User> {
    try {
      return sendMessageRepository.Execute(roomID, message);
    } catch (e) {
      console.log("[SendMessageUseCaseImpl] Error Execute ", e);
      throw e;
    }
  }
}

export const sendMessageUseCase = new SendMessageUseCaseImpl() as SendMessageUseCase;