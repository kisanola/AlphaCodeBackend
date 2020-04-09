import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

/**
 * @param  {Object} payload
 * @param {string} expiresIn
 * @returns  {string} token
 */
const generateToken = (payload: object, expiresIn = '7d'): string => {
  const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn });
  return token;
};

export default generateToken;
