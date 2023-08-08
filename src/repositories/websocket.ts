export type WebSocketData = string | ArrayBufferLike | Blob | ArrayBufferView

export interface WebSocketObserver {
  onmessage(messageEvent: MessageEvent): any
}

export interface MessageWebsocket {
  subscribe(observer: WebSocketObserver): void
  send(data: WebSocketData): void
}

export class IMessageWebSocket implements MessageWebsocket {
  private webSocket: WebSocket | null;
  private observers: WebSocketObserver[] = [];

  constructor(url: string) {
    this.webSocket = new WebSocket(url);
    this.webSocket.onmessage = this.onmessage;
  }

  public send(data: WebSocketData): void {
    this.webSocket?.send(data);
  }

  public subscribe(observer: WebSocketObserver): void {
    this.observers.push(observer);
  }

  public onmessage(messageEvent: MessageEvent): void {
    for (const observer of this.observers) {
      observer.onmessage(messageEvent);
    }
  }
}