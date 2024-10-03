import {createStore} from './../services/store.service.js';


export const addStore = async (req, res, next) => {
    try {
        const request = {...req.body};
        const response = await createStore(request);
        return res.status(200).json({status:true,data:response});  
    } catch (error) {
        next(error);
    }   
};
