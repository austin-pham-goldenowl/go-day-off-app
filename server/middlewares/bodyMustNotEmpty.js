import { handleFailure } from "../helpers/handleResponse";

module.exports = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length > 0) next();
    else throw { msg: "INVALID_VALUES" };
  }
  catch(err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
};