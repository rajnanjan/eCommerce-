import Joi from "joi";

export const addimage = Joi.object({
   name: Joi.string().min(3).max(255).required(),
   image: Joi.object({
    fieldname: Joi.string().valid('file').required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
    size: Joi.number().max(1000000) 
  }).unknown()
})
// export const addimage = Joi.object({
//     item_type: Joi.string().required(),
//     item_name: Joi.string().required(),
//     item_desc: Joi.string().optional(),
//     item_measure: Joi.string().required(),
//     store_id:Joi.number().required(),
//     item_image:Joi.number().required(),
// })

export const getimage= Joi.object({
    id:Joi.number().required()
});
