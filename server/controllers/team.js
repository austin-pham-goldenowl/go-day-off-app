const express = require("express");
const Router = express.Router();

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");

/**
 * Models
 */
const { teams: teamModel } = require("../models");

Router.get("/", async (req, res) => {
  try {
    const teams = await teamModel.loadAll();
    handleSuccess(res, { teams });
  } catch (err) {
    console.log("Controller > team > getAll > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

Router.get("/details", async (req, res) => {
  try {
    const fId = req.query.id;
    if (!fId) throw { msg: "INVALID_QUERY" };
    const team = await teamModel.loadAll([], { where: { fId } });
    if (!team || team.length !== 1) throw { msg: "TEAM_NOT_FOUND" };
    handleSuccess(res, { team: team[0] });
  } catch (err) {
    console.log("Controller > team > getDetails > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

module.exports = Router;
