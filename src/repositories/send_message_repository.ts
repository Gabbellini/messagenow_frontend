import {MessageWebSocketImpl, WebSocketData} from "@/repositories/websocket";

interface SendMessageRepository {
  Execute(message: WebSocketData): void
}

class SendMessageRepositoryImpl implements SendMessageRepository {
  Execute(data: WebSocketData): void {
    try {
      MessageWebSocketImpl.send(data);
    } catch (e) {
      console.log("[SendMessageRepositoryImpl] Error Execute ", e);
      throw e;
    }
  }
}

export const sendMessageRepository = new SendMessageRepositoryImpl() as SendMessageRepository;