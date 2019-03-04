module.exports = {
  handleSuccess(res, { code = 200, ...others }, next = null) {
    res.status(code).json({
      success: true,
      ...others
    });
    next && next();
  },

  handleFailure(res, { code = 400, msg = "", ...others }, next = null) {
    res.status(code).json({
      success: false,
      msg,
      ...others
    });
    next && next();
  }
};
