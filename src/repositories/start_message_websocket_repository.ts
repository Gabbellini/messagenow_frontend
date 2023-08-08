import {MessageWebSocketImpl} from "@/repositories/websocket";
import {apiDomain} from "@/repositories/http";

interface StartMessageWebsocketRepository {
  Execute(roomID: number): WebSocket
}

class StartMessageWebsocketRepositoryImpl implements StartMessageWebsocketRepository {
  Execute(roomID: number): WebSocket {
    return MessageWebSocketImpl.getInstance(`ws://${apiDomain}/rooms/${roomID}/ws`);
  }
}

export const startMessageWebSocketRepository = new StartMessageWebsocketRepositoryImpl() as StartMessageWebsocketRepository;