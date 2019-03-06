export const handleSuccess = (res,
  { code = 200, ...others } = {},
  next = null) => {
  res.status(code).json({
    success: true,
    ...others
  });
  next && next();
};

export const handleFailure = (res,
  { code = 400, msg = "", ...others } = {},
  next = null) => {
  res.status(code).json({
    success: false,
    msg,
    ...others
  });
  next && next();
};
