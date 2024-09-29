import db from '../db/db.js';

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
