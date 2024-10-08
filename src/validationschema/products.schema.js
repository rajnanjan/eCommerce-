import Joi from 'joi';

export const validate_product = Joi.object({
  item_type: Joi.string().required(),
  item_name: Joi.string().required(),
  item_desc: Joi.string().optional(),
  item_measure: Joi.string().required(),
  item_price: Joi.number().required(),
  store_id: Joi.number().required(),
  item_image: Joi.number().required()
});
