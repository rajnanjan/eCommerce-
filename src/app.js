import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

import db from './db/db.js';
import logger from './utils/logger.js';
import morganMiddleware from './middlewares/morgan.middleware.js';
import productImages from './routes/attachment.router.js';

// routes
import userRouter from './routes/user.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: '*'
  })
);

// Using morgan middleware
app.use(morganMiddleware);

db.connect()
  .then(() => logger.info('DATABASE connected !!'))
  .catch((error) => logger.error('Database error: ' + error));

app.get('/', (_, res) => {
  res.send('Server is up');
});

app.use('/api/v1/image',productImages);
app.use('/api/v1/users', userRouter);

// Keep the error handler in end of routes
app.use(errorMiddleware);

export default app;
