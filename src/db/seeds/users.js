import { hash } from '../../utils/helper.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').truncate();
  const users = [{ id: 1, user_name: 'Sakthivel', password: 'Admin@123' }];
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    user.password = await hash(user.password);
  }
  await knex('users').insert(users);
};
