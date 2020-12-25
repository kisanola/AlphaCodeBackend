import { Request, Response, NextFunction } from 'express';
import { isCelebrate, CelebrateInternalError } from 'celebrate';
import { BAD_REQUEST } from '../constants/status-codes';
import jsonResponse from '../helpers/jsonResponse';

const joiErrors = () => (err: CelebrateInternalError, req: Request, res: Response, next: NextFunction): any => {
  if (!isCelebrate(err)) return next(err);

  const errors = {};
  let message = 'Bad Request';
  err.joi.details.forEach((error: any) => {
    errors[error.context.key] = error;
    message = error.message;
  });

  return jsonResponse({
    status: BAD_REQUEST,
    res,
    message,
    errors,
  });
};

export default joiErrors;
