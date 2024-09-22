// Update with your config settings.

import logger from '../utils/logger.js';

const config = {
  dev: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'chicken_coop',
      user: 'postgres',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'rt_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  development: {
    client: 'pg',
    debug: true,
    compileSqlOnError: true,
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'rt_migrations',
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    },
    log: {
      warn(msg) {
        logger.warn(msg);
      },
      error(msg) {
        logger.error(msg);
      },
      deprecate(msg) {
        logger.warn(msg);
      },
      debug(msg) {
        logger.debug(msg);
      }
    }
  },
  staging: {},
  production: {}
};

export default config;
