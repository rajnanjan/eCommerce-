import Joi from "joi";

export const uploadimages=Joi.object({
        name: Joi.string().min(3).max(255).required(),
        image: Joi.object({
          fieldname: Joi.string().valid('file').required(),
          mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
          size: Joi.number().max(1000000)
        }).unknown()
});

export const getimage= Joi.object({
  id:Joi.number().required()
});
