const express = require("express");
const Router = express.Router();

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");

/**
 * Models
 */
const { absenceTypes: absenceTypeModel } = require("../models");

Router.get("/", async (req, res) => {
  try {
    const absenceTypes = await absenceTypeModel.loadAll();
    handleSuccess(res, { absenceTypes });
  } catch (err) {
    handleFailure(res, {
      err,
      route: req.originalUrl
    });
  }
});

Router.get("/details", async (req, res) => {
  try {
    const fId = req.query.id;
    if (!fId) throw { msg: "INVALID_QUERY" };
    const absence = await absenceTypeModel.loadAll([], { where: { fId } });
    if (!absence || absence.length !== 1) throw { msg: "TYPE_NOT_FOUND" };
    handleSuccess(res, { absence: absence[0] });
  } catch (err) {
    handleFailure(res, {
      err,
      route: req.originalUrl
    });
  }
});

module.exports = Router;
