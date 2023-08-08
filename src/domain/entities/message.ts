type Sender = {
  id: number;
  name: string;
  image: string;
}

export class Message {
  public sender: Sender;
  public text: string;
  public createdAt: string;

  constructor(sender: Sender, text: string, createdAt: string) {
    this.sender = sender;
    this.text = text;
    this.createdAt = createdAt;
  }
}