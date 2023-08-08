import {startMessageWebSocketRepository} from "@/repositories/start_message_websocket_repository";

interface StartMessageWebSocketUseCase {
  Execute(roomID: number): WebSocket
}

class StartMessageWebsocketUseCaseImpl implements StartMessageWebSocketUseCase {
  Execute(roomID: number): WebSocket {
    return startMessageWebSocketRepository.Execute(roomID);
  }
}

export const startMessageWebSocketUseCase = new StartMessageWebsocketUseCaseImpl() as StartMessageWebSocketUseCase;