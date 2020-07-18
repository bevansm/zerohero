import AbstractMessageHandler from './AbstractMessageHandler';
import axios from 'axios';
import sample from 'lodash/sample';

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
  protected async handleMessageTxt(msg: string) {
    const [t0, t1 = ''] = msg.split(',', 1);
    const form = new FormData();
    form.append('template_id', sample(minionTemplateIds));
    form.append('username', process.env.IMGFLIP_USER);
    form.append('password', process.env.IMGFLIP_PASS);
    form.append('text0', t0);
    form.append('text1', t1);
    return axios.post(`${baseUrl}/caption_image`).then(r => r.data.url);
  }
}

export default MinionHandler;
