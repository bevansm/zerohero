import AbstractMessageHandler from './AbstractMessageHandler';

import axios from 'axios';

const baseUrl = 'https://inspirobot.me/api';
class InspirationalHandler extends AbstractMessageHandler {
  protected handleMessageTxt() {
    return axios.get(`${baseUrl}?generate=true`).then(r => r.data);
  }
}

export default InspirationalHandler;
