import { Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../constants/status-codes';

interface ResponseParams {
  res: Response;
  status?: number;
  [x: string]: any;
}
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {ServerResponse} Response
 */
const jsonResponse = ({ status = OK, res, ...data }: ResponseParams): Response => {
  return res.status(status).json({
    status,
    ...data,
  });
};

export default jsonResponse;
