import db from './../db/db.js';


export const stocksadd = async(stocks) =>{
    const conn = await db.getTransaction();
    try {
        const response = await conn('stocks').insert(stocks).returning('*');
        await conn.commit();
        return response;
    } catch (error) {
        await conn.rollback();
        throw error;
    }
};