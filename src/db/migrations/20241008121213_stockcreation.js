/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('stocks', (table) => {
        table.bigIncrements('id').primary();
        table.bigint('prod_id').notNullable().references('products.id').unique();
        table.string('available_stock').notNullable();
        table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
        table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
      });
      await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "stocks"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
      await knex.schema.createTable('stock_transactions',(table)=>{
        table.bigIncrements('id').primary();
        table.bigint('stock_id').notNullable().references('stocks.id');
        table.integer('change_quantity').notNullable();
        table.string('transaction_type').notNullable();
        table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTableIfExists('stocks');
    await knex.schema.dropTableIfExists('stock_transactions');
};
