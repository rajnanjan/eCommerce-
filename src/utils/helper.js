import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Hashes a string using bcrypt.
 *
 * @param {string} data - The string to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed string.
 */
export const hash = async (data) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};

/**
 * Generates a JSON Web Token (JWT) for authentication.
 *
 * @param {object} data - User data to be included in the token payload.
 * @returns {Promise<string>} A promise that resolves to the generated JWT token.
 */
export const generateToken = async (data) => {
  const secret = process.env.SECRET;
  const token = await jwt.sign({ data }, secret, {
    expiresIn: '30d', // 30 days
    subject: 'Sadha Chicken'
  });
  return token;
};

/**
 * Compares a user-provided password with a stored hashed password using bcrypt.
 *
 * @param {string} userPassword - The user-provided password.
 * @param {string} storedPassword - The stored hashed password.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the passwords match,
 *  `false` otherwise.
 */
export const compare = async (userPassword, storedPassword) => {
  const valid = await bcrypt.compare(userPassword, storedPassword);
  return valid;
};

/**
 * Verifies a JSON Web Token (JWT).
 *
 * @param {string} data - The JWT token to verify.
 * @param {string} secret - The secret key used to sign the token (from environment variable).
 * @returns {Promise<object>} A promise that resolves to the decoded user data from the verified token,
 *  or throws an error if the token is invalid.
 */
export const verify = async (data, secret) => {
  const user = await jwt.verify(data, secret);
  return user;
};

/**
 * Generates a random One-Time Password (OTP).
 *
 * @returns {Promise<string>} A promise that resolves to the generated OTP string.
 *  The length of the OTP is determined by the `OTPLENGTH` environment variable.
 */
export const generateOtp = async () => {
  let otp = '';
  const length = process.env.OTPLENGTH;
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * (10 - 1) + 1);
  }
  return otp;
};
