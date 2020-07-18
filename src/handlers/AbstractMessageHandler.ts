import { Message, Client, MessageReaction } from 'discord.js';

interface IMessageHandler {
  handleMessage(msg: Message): Promise<void>;
}

abstract class AbstractMessageHandler implements IMessageHandler {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  protected abstract async createReply(msg: Message): Promise<string>;

  protected async reply(msg: Message): Promise<Message> {
    return msg.reply(await this.createReply(msg));
  }

  protected async react(msg: Message): Promise<MessageReaction> {
    return null;
  }

  public async handleMessage(msg: Message): Promise<void> {
    try {
      console.log(msg.content);
      await this.react(msg);
      await this.reply(msg);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }
}

export default AbstractMessageHandler;
