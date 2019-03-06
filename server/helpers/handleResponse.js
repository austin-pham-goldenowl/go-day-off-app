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
  { err = {}, route = "[Unknown route]", ...others } = {},
  next = null) => {
  const code = err.code || 400;
  const msg = err.msg || "SOMETHING_WENT_WRONG";
  err.code && delete err.code;
  // if (process.env.NODE_ENV === "development")
  console.log(`ERROR: Controller [ ${route} ]: ${JSON.stringify(err)}`);

  res.status(code).json({
    success: false,
    msg,
    ...others
  });
  next && next();
};
