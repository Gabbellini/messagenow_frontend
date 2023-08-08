import {IMessageWebSocket, MessageWebsocket} from "@/repositories/websocket";
import {apiDomain} from "@/repositories/http";

interface StartMessageWebsocketRepository {
  Execute(roomID: number): MessageWebsocket
}

class StartMessageWebsocketRepositoryImpl implements StartMessageWebsocketRepository {
  Execute(roomID: number): MessageWebsocket {
    return new IMessageWebSocket(`ws://${apiDomain}/rooms/${roomID}/ws`);
  }
}

export const startMessageWebSocketRepository = new StartMessageWebsocketRepositoryImpl() as StartMessageWebsocketRepository;