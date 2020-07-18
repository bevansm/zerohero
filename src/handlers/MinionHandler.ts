import AbstractMessageHandler from './AbstractMessageHandler';
import axios from 'axios';
import sample from 'lodash/sample';
import { Message } from 'discord.js';
import qs from 'qs';

const minionTemplateIds: string[] = [
  '40407999',
  '3929882',
  '45979769',
  '10152342',
  '23734772',
  '11707266',
  '192894048',
  '72394162',
  '30315285',
  '120558050',
  '245202008',
];
const baseUrl = 'https://api.imgflip.com';

class MinionHandler extends AbstractMessageHandler {
  protected async createReply(msg: Message) {
    const { content } = msg;
    const splitContent = content.split(',');
    const text0 = splitContent.shift();
    const text1 = splitContent.join(',');
    const {
      data: {
        data: { url },
      },
      data,
    } = await axios.post(
      `${baseUrl}/caption_image`,
      qs.stringify({
        template_id: sample(minionTemplateIds),
        username: process.env.IMGFLIP_USER,
        password: process.env.IMGFLIP_PASS,
        text0,
        text1,
      })
    );
    return url;
  }
}

export default MinionHandler;
