import config from './knexfile.js';
import Knex from 'knex';

/**
 * Class for DB Connection
 */
class DB {
  /**
   * Creates a new DB instance.
   */
  constructor() {
    this.conn = null;
  }
  /**
   * @returns void
   */
  async connect() {
    this.conn = new Knex(config['development']);
    return await this.conn.raw('SELECT 1');
  }
  /**
   * @return { Promise<import('knex').Knex.Transaction> } Knex Transaction object
   */
  async getTransaction() {
    const trx = await this.conn.transaction();

    return trx;
  }
  /**
   * @returns
   */
  async close() {
    this.conn.destroy();
  }
}

export default DB;
