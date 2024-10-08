import { attach, getimages } from './../services/productsimages.services.js';

export const imagesadd = async (req, res, next) => {
  try {
    const request = {
      image_name: req.files[0].originalname,
      image_data: req.files[0].buffer
    };
    const response = await attach(request);
    res.status(200).json({ status: true, data: response });
  } catch (error) {
    next(error);
  }
};

export const imageget = async (req, res, next) => {
  try {
    const { id } = req.query;
    const response = await getimages(id);
    res.set('Content-Type', 'image/jpeg');
    res.send(response.image_data);
  } catch (error) {
    next(error);
  }
};
