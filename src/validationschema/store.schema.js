import Joi from "joi";

export const createStore = Joi.object({
    store_address: Joi.string().required(),
    store_name: Joi.string().required()
});


