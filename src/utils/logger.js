import winston from 'winston';
const { combine, errors, timestamp, printf, json } = winston.format;
import 'winston-daily-rotate-file';

/**
 * Description: TO create transport for storing the log on daily basis
 */
const infoRotateTransport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '30d',
  maxSize: '10m'
});

const logger = winston.createLogger({
  level: 'silly',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    printf((info) => `${info.level}:  [${info.timestamp}]  ---${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', format: json() }),
    infoRotateTransport,
    new winston.transports.Console({ format: json(), level: 'debug' })
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'exception.log' })
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'rejections.log' })
  ]
});

export default logger;
