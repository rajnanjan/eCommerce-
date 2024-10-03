import Joi from "joi";

export const storevalidate = Joi.object({
    store_address: Joi.string().max(250).required(),
    store_name: Joi.string().required()
});


