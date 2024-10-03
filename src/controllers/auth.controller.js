import { getCustomerByMobNo, storeCustomer, storeOtp } from '../services/customer.service.js';
import { getUserByUserName } from '../services/user.service.js';
import { errorResponse } from '../utils/errorResponse.js';
import { compare, generateOtp, generateToken } from '../utils/helper.js';

/**
 * Handles the admin login
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 *
 * @throws  {Error} If an error occurs during user login.
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

/**
 * Handles Customer login using Mobile number
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 *
 * @throws  {Error} If an error occurs during customer login.
 */
export const loginViaMobile = async (req, res, next) => {
  try {
    const { mobile_no } = req.body;

    const customer = await getCustomerByMobNo(mobile_no);
    if (Array.isArray(customer) && customer.length < 1)
      throw errorResponse(400, 'Mobile Number Not found');

    const otp = await generateOtp();

    storeOtp(otp, mobile_no);
    //  TODO: Handle OTP sent

    return res.status(200).send({
      error: false,
      message: 'OTP sent successfulky'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles customer signup.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 *
 * @throws  {Error} If an error occurs during customer creation.
 */
export const signUp = async (req, res, next) => {
  try {
    const { name, email, mobile_no } = req.body;

    // Check if email already exists
    const existingUser = await getCustomerByMobNo(mobile_no);

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      throw errorResponse(400, 'User already exists');
    }

    const customer = await storeCustomer(name, email, mobile_no);

    // Handle successful signup
    res.status(201).json({ message: 'User created successfully', customer });
  } catch (error) {
    next(error);
  }
};
