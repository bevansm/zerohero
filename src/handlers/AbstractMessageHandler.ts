import { Message } from 'discord.js';

interface IMessageHandler {
  handleMessage(msg: Message): Promise<void>;
}

abstract class AbstractMessageHandler implements IMessageHandler {
  protected abstract async handleMessageTxt(msg: string): Promise<string>;

  public async handleMessage(msg: Message): Promise<void> {
    await msg.reply(await this.handleMessageTxt(msg.content));
  }
}

export default AbstractMessageHandler;
