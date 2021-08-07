import express from 'express';
import mongoose from 'mongoose';
import { config as loadENV } from 'dotenv';
import cors from 'cors';

import corsOptions from './corsOptions';

loadENV();

const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.use(cors(corsOptions));
  } catch (error) {
    console.error(error);
  }
})();

export default app;
