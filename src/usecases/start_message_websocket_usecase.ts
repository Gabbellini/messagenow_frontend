import {startMessageWebSocketRepository} from "@/repositories/start_message_websocket_repository";
import {MessageWebsocket} from "@/repositories/websocket";

interface StartMessageWebSocketUseCase {
  Execute(roomID: number): MessageWebsocket
}

class StartMessageWebsocketUseCaseImpl implements StartMessageWebSocketUseCase {
  Execute(roomID: number): MessageWebsocket {
    return startMessageWebSocketRepository.Execute(roomID);
  }
}

export const startMessageWebSocketUseCase = new StartMessageWebsocketUseCaseImpl() as StartMessageWebSocketUseCase;