import { getUserByUserName } from '../services/user.service.js';
import { errorResponse } from '../utils/errorResponse.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/helper.js';

/**
 *
 * @param {import("expres").request} req
 * @param {import("express").response} res
 * @param {NextFunction} next
 */
export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByUserName(userName);

    if (!user) throw errorResponse(400, 'User Not Found');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw errorResponse(400, 'Invalid User Credentials');

    const token = await generateToken(userName);
    const userres = {
      user: userName,
      token,
      error: false
    };
    return res.status(200).send(userres);
  } catch (error) {
    next(error);
  }
};
