const asyncHandler = (cb: any) => async (req: any, res: any, next?: any) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default asyncHandler;
