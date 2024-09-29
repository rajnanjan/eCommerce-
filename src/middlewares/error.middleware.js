export const errorMiddleware = (err, req, res, __) => {
  const errStatus = err.statusCode;
  const errMessage = err.message;

  res.status(errStatus).json({
    error: true,
    status: errStatus,
    message: errMessage
  });
};
