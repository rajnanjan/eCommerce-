import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

import db from './src/db/db.js';
import logger from './src/utils/logger.js';
import productImages from './src/routers/attachment.router.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: '*'
  })
);

db.connect()
  .then(() => logger.info('DATABASE connected !!'))
  .catch((error) => logger.error('Database error: ' + error));
const PORT = process.env.PORT||8000;

app.get('/', (_, res) => {
  res.send('Server is up');
});
app.listen(PORT, () => console.log('Server is up..'));

app.use('/api/v1/image',productImages)
