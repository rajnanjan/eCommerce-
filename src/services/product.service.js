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

export const productsList = async (name)=>{
    const conn = await db.getTransaction();
    try {
        const query = conn('products').leftJoin('stocks','stocks.prod_id','products.id').select('products.id',
            'products.item_type',
            'products.item_name',
            'products.item_desc',
            'products.item_measure',
            'products.item_price',
            'products.item_image',
            'products.store_id',
            'stocks.available_stock').orderBy('products.c_ts').where('stocks.available_stock', '>',0);
        if (name) {
            query.andWhere('item_name', 'ILIKE', `%${name}%`);
        }
        const response = await query;
        return response;

    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }
};
