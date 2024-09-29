import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hash = async (data) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};

export const generateToken = async (data) => {
  const secret = process.env.SECRET;
  const token = await jwt.sign({ userName: data }, secret);
  return token;
};
