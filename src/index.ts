import dotenv from 'dotenv';
import express from 'express';
import { Client } from 'discord.js';
import InspirationalHandler from './handlers/InspirationalHandler';
import MinionHandler from './handlers/MinionHandler';
import { min } from 'lodash';

dotenv.config({ path: __dirname + './../.env' });
const app = express();

const runner = async () => {
  const client = new Client({
    restRequestTimeout: 600000,
    retryLimit: 10,
  });

  const inspirationalHandler = new InspirationalHandler(client);
  const minionHanlder = new MinionHandler(client);

  client.on('message', async msg => {
    const { content } = msg;
    const contentLower = content.toLowerCase().trim();

    if (contentLower.indexOf('minion') > -1) {
      minionHanlder.handleMessage(msg);
    } else if (
      contentLower.indexOf('im ') === 0 ||
      contentLower.indexOf("i'm ") === 0
    ) {
      // TODO
    } else if (contentLower.indexOf('inspiration') > -1) {
      inspirationalHandler.handleMessage(msg);
    }
  });

  app.listen(8080);
};

runner();
