import { createProduct,productsList } from './../services/product.service.js';
import { stocksadd } from '../services/stocks.services.js';

export const addProduct = async (req, res, next) => {
  try {
    const request = { ...req.body };
    const stocksReq = {available_stock:request.total_stocks};
    delete request.total_stocks;
    const response = await createProduct(request);
    stocksReq["prod_id"]= response[0].id;
   const stockRes = await stocksadd(stocksReq);
    return res.status(200).json({ status: true, data: {...response[0],available_stock:stockRes[0].available_stock} });
  } catch (error) {
    next(error);
  }
};

export const getProduts = async (req, res, next)=>{
    try {
        const {name} = req.query;
        const response = await productsList(name);
        return res.status(200).json({status:true,data:response});
    } catch (error) {
        next(error);
    }
};
