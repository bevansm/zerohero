import AbstractMessageHandler from './AbstractMessageHandler';

import axios from 'axios';
import { Message } from 'discord.js';

const baseUrl = 'https://icanhazdadjoke.com/';
class DadHandler extends AbstractMessageHandler {
  protected react(msg: Message) {
    return msg.react('👔');
  }

  protected async createReply(msg: Message) {
    const { content } = msg;
    const contentLower = content.toLowerCase();
    const contentSplit = contentLower.split(' ');
    const { joke } = await axios
      .get(baseUrl, { headers: { accept: 'application/json' } })
      .then(r => r.data);
    return `Hi${
      contentSplit[1] ? ' ' + contentSplit.slice(1).join(' ') : ''
    }! I'm dad. ${joke}`;
  }
}

export default DadHandler;
