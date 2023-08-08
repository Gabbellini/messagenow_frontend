import {sendMessageRepository} from "@/repositories/send_message_repository";
import {WebSocketData} from "@/repositories/websocket";

interface SendMessageUseCase {
  Execute(message: WebSocketData): void
}

class SendMessageUseCaseImpl implements SendMessageUseCase {
  Execute(data: WebSocketData): void {
    try {
      return sendMessageRepository.Execute(data);
    } catch (e) {
      console.log("[SendMessageUseCaseImpl] Error sendMessageRepository ", e);
      throw e;
    }
  }
}

export const sendMessageUseCase = new SendMessageUseCaseImpl() as SendMessageUseCase;