import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UNAUTHORIZED } from '../constants/status-codes';
import jsonResponse from '../helpers/jsonResponse';
import User from '../models/User';

const { JWT_SECRET = '' } = process.env;

const checkAuth = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const { authorization = '' } = req.headers;

  const token = authorization.slice(4);

  if (!token) {
    return jsonResponse({
      res,
      status: UNAUTHORIZED,
      message: 'Unauthorized access',
    });
  }

  jwt.verify(
    token,
    JWT_SECRET,
    async (err: any, decoded: any): Promise<any> => {
      if (err || !decoded) {
        return jsonResponse({
          res,
          status: UNAUTHORIZED,
          message: 'Invalid token',
        });
      }

      const foundUser = await User.findByEmail(decoded.email);

      if (!foundUser) {
        return jsonResponse({
          res,
          status: UNAUTHORIZED,
          message: 'Unauthorized access',
        });
      }

      req.currentUser = foundUser;
      next();
    },
  );
};

export default checkAuth;
