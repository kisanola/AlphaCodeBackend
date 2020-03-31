import { Request, Response } from 'express';

const asyncHandler = (cb: any) => async (
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default asyncHandler;
