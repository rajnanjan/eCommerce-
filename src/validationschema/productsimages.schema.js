import Joi from "joi";

export const uploadimages=Joi.object({
        image_name: Joi.string().min(3).max(255).required(),
        image: Joi.object({
          fieldname: Joi.string().valid('image').required(),
          mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
          size: Joi.number().max(1000000)
        }).unknown()
});
