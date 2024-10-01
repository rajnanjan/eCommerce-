import 'dotenv/config.js';
import http from 'http';
import https from 'https';
import app from './src/app.js';
import logger from './src/utils/logger.js';

const options = {};
const server = http.createServer(app);
const httpsServer = https.createServer(options, app);
const PORT = process.env.PORT||8000;
const SPORT = process.env.SPORT;

if (PORT)
  server.listen(PORT, () => {
    logger.info('Server is up....' + PORT);
  });

if (SPORT)
  httpsServer.listen(SPORT, () => {
    logger.info('Server is up....' + SPORT);
  });
