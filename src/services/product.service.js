import db from './../db/db.js';

export const createProduct = async (data) => {
  const conn = await db.getTransaction();
  try {
    const response = await conn('products').insert(data).returning('*');
    await conn.commit();
    return response;
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
