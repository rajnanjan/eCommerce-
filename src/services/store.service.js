import db from './../db/db.js';

export const createStore = async (data)=>{
    const conn = await db.getTransaction();
    try {
        const res = await conn('stores').insert(data).returning('*');
        await conn.commit();
        return res;
    } catch (error) {
        await conn.rollback();
        throw (error);
    }
};
