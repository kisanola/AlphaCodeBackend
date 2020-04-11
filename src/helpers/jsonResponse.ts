import { Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/status-codes';

interface ResponseParams {
  res: Response;
  status: number;
  [x: string]: number | string | object;
}
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {ServerResponse} Response
 */
const jsonResponse = ({ status = INTERNAL_SERVER_ERROR, res, ...data }: ResponseParams): Response => {
  return res.status(status).json({
    status,
    ...data,
  });
};

export default jsonResponse;
