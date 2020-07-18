import dotenv from 'dotenv';
import express from 'express';
import { Client } from 'discord.js';

dotenv.config({ path: __dirname + './../.env' });
const app = express();

const runner = async () => {
  const client = new Client({
    restRequestTimeout: 600000,
    retryLimit: 10,
  });

  client.on("ready", () => {

  });
  app.
};

runner();
