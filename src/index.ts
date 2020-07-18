import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: __dirname + './../.env' });
const app = express();

const runner = async () => {
  app.listen(80);
};

runner();
