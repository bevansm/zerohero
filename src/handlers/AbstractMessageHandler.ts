import { Message, Client } from 'discord.js';

interface IMessageHandler {
  handleMessage(msg: Message): Promise<void>;
}

abstract class AbstractMessageHandler implements IMessageHandler {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  protected abstract async handleMessageTxt(msg?: string): Promise<string>;

  public async handleMessage(msg: Message): Promise<void> {
    try {
      await msg.reply(await this.handleMessageTxt(msg.content));
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }
}

export default AbstractMessageHandler;
