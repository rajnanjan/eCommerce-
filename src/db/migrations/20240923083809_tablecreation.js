/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('stores', (table) => {
    table.bigIncrements('id').primary();
    table.string('store_address', 250).notNullable();
    table.string('store_name', 50).notNullable();
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('product_images', (table) => {
    table.bigIncrements('id').primary();
    table.string('image_name').notNullable();
    table.binary('image_data').notNullable();
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('customers', (table) => {
    table.bigIncrements('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('mobile_number', 255).notNullable().unique();
    table.integer('otp', 6);
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
        CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
        LANGUAGE plpgsql
        AS
        $$
        BEGIN
            NEW.u_ts = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$;
    `);
  await knex.schema.createTable('products', (table) => {
    table.bigIncrements('id').primary();
    table.string('item_type', 255).notNullable().unique();
    table.string('item_name', 255).notNullable();
    table.string('item_desc', 255);
    table.string('item_measure', 100).notNullable();
    table.bigint('item_image').notNullable().references('product_images.id');
    table.bigint('store_id').notNullable().references('stores.id');
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "products"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);

  await knex.schema.createTable('cust_address', (table) => {
    table.bigIncrements('id').primary();
    table.string('type').notNullable();
    table.json('data').notNullable();
    table.bigint('cust_id').notNullable().references('customers.id');
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "cust_address"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);

  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "customers"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);

  await knex.schema.createTable('orders_details', (table) => {
    table.bigIncrements('id').primary();
    table.json('order_data').notNullable();
    table.enum('status', ['waiting', 'confirmed', 'delivered', 'canceled'], {
      useNative: true,
      enumName: 'order_status'
    });
    table.bigint('store_id').notNullable().references('stores.id');
    table.bigint('cust_id').notNullable().references('customers.id');
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "orders_details"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
  await knex.schema.createTable('sales_details', (table) => {
    table.bigIncrements('id').primary();
    table.json('sales_details').notNullable();
    table.bigint('store_id').notNullable().references('stores.id');
    table.bigint('cust_id').notNullable().references('customers.id');
    table.bigint('order_id').notNullable().references('orders_details.id');
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });
  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "sales_details"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);

  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "stores"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').primary();
    table.string('user_name', 50).notNullable();
    table.string('password', 100).notNullable();
    table.timestamp('c_ts').notNullable().defaultTo(knex.fn.now());
    table.timestamp('u_ts').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "users"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.raw(`
        DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
      `);
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('product_images');
  await knex.schema.dropTableIfExists('cust_address');
  await knex.schema.dropTableIfExists('sales_details');
  await knex.schema.dropTableIfExists('orders_details');
  await knex.schema.raw('DROP TYPE order_status');
  await knex.schema.dropTableIfExists('stores');
  await knex.schema.dropTableIfExists('customers');
  await knex.schema.dropTableIfExists('users');
};
