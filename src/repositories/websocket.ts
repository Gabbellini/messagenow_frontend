export type WebSocketData = string | ArrayBufferLike | Blob | ArrayBufferView

export class MessageWebSocketImpl {
  private static websocket: WebSocket | null;

  private constructor() {
    return;
  }

  public static getInstance(url: string): WebSocket {
    if (!this.websocket) {
      this.websocket = new WebSocket(url);
    }
    return this.websocket;
  }

  public static send(data: WebSocketData): void {
    console.log(data);
    MessageWebSocketImpl.websocket?.send(data);
  }
}