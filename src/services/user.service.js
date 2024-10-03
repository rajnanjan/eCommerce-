import db from '../db/db.js';

/**
 * Retrieves user data based on the provided username.
 *
 * @param {string} user_name - The username of the user.
 * @returns {Object|null} - The user data object, including username and password, or null if not found.
 */
export const getUserByUserName = async (user_name) => {
  const conn = await db.getTransaction();
  try {
    const user = await conn('users').select('user_name', 'password').where({ user_name }).first();
    await conn.commit();
    return user;
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
