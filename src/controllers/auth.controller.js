import { getUserByUserName } from '../services/user.service.js';
import { errorResponse } from '../utils/errorResponse.js';
import { compare, generateToken } from '../utils/helper.js';

/**
 *
 * @param {import("express").request} req
 * @param {import("express").response} res
 * @param {NextFunction} next
 */
export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByUserName(userName);

    if (!user) throw errorResponse(400, 'User Not Found');

    if (!(await compare(password, user.password)))
      throw errorResponse(400, 'Invalid User Credentials');

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

// /**
//  *
//  * @param {import("express").request} req
//  * @param {import("express").response} res
//  * @param {NextFunction} next
//  */
// export const loginViaMobile = async (req, res, next) => {
//   try {
//     const { mobile_no } = req.query;
//   } catch (error) {
//     next(error);
//   }
// };
