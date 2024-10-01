import db from './../db/db.js';
import { errorResponse } from '../utils/errorResponse.js';

export const attach = async (data)=>{
    const conn = await db.getTransaction();
    try {
        const response = await conn('product_images').insert(data).returning('id');
        await conn.commit();
        return response;
    } catch (error) {
        await conn.rollback();
        throw error;
    }
};

export const getimages = async (id)=>{
    const conn = await db.getTransaction();
    try {
        const response = await conn('product_images').select('*').where('id',id);
        if(!response.length) throw errorResponse(404,"images not found for given id: "+id);
        await conn.commit();
        return response[0];
    } catch (error) {
        await conn.rollback();
        throw error;
    }
};

