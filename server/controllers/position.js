const express = require("express");
const Router = express.Router();

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");

/**
 * Models
 */
const { positions: positionModel } = require("../models");

Router.get("/", async (req, res) => {
  try {
    const positions = await positionModel.loadAll();
    handleSuccess(res, { positions });
  } catch (err) {
    console.log("Controller > position > getAll > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

Router.get("/details", async (req, res) => {
  try {
    const fId = req.query.id;
    if (!fId) throw { msg: "INVALID_QUERY" };
    const position = await positionModel.loadAll([], { where: { fId } });
    if (!position || position.length !== 1) throw { msg: "POSITION_NOT_FOUND" };
    handleSuccess(res, { position: position[0] });
  } catch (err) {
    console.log("Controller > position > getDetails > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

module.exports = Router;
