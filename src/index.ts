import { Client } from 'discord.js';
import InspirationalHandler from './handlers/InspirationalHandler';
import MinionHandler from './handlers/MinionHandler';
import DadHandler from './handlers/DadHandler';

const start = async () => {
  const client = new Client({
    restRequestTimeout: 600000,
    retryLimit: 10,
  });

  await client.login(process.env.BOT_TOKEN);

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  const inspirationalHandler = new InspirationalHandler(client);
  const minionHandlder = new MinionHandler(client);
  const dadHandler = new DadHandler(client);

  client.on('message', async msg => {
    const {
      content,
      author: { bot },
    } = msg;

    const contentLower = content.toLowerCase().trim();

    if (!bot) {
      if (contentLower.indexOf('minion') > -1) {
        minionHandlder.handleMessage(msg);
      }
      if (
        contentLower.indexOf('im') === 0 ||
        contentLower.indexOf("i'm") === 0
      ) {
        dadHandler.handleMessage(msg);
      }
      if (contentLower.indexOf('inspir') > -1) {
        inspirationalHandler.handleMessage(msg);
      }
    }
  });
};

process.on('SIGINT', () => {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(1);
});

start();
