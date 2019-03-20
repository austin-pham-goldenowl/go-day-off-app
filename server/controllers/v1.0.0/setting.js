const express = require("express");
const Router = express.Router();

/**
 * Models
 */
const { settings: settingModel } = require("../../models");

/**
 * Helpers
 */
const {
  handleSuccess,
  handleFailure
} = require("../../helpers/handleResponse");
const {
  getPermissionByToken
} = require("../../helpers/getUserInfo");

Router.get("/", async (req, res) => {
  try {
    // only HR can get configs
    const fUserType = await getPermissionByToken(req.token_payload);
    if (fUserType !== "HR") throw { cod: 401, msg: "NO_PERMISSION" };

    const settings = await settingModel.loadAll();
    handleSuccess(res, { settings });
  }
  catch(err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.post("/", async (req, res) => {
  try {
    // only HR can edit configs
    const fUserType = await getPermissionByToken(req.token_payload);
    if (fUserType !== "HR") throw { cod: 401, msg: "NO_PERMISSION" };
    const { pairs } = req.body;
    if (!Array.isArray(pairs) || pairs.length < 1) throw { msg: "INVALID_VALUES" };

    const entities = pairs.map(setting => settingModel.add({ fName: setting[0], fValue: setting[1] }));
    Promise.all(entities)
      .then(() => {
        handleSuccess(res, { code: 201 });
      })
      .catch(err => handleFailure(res, { err, route: req.originalUrl }));
  }
  catch(err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.patch("/", async (req, res) => {
  try {
    // only HR can edit configs
    const fUserType = await getPermissionByToken(req.token_payload);
    if (fUserType !== "HR") throw { cod: 401, msg: "NO_PERMISSION" };
    const { pairs } = req.body;
    if (!Array.isArray(pairs) || pairs.length < 1) throw { msg: "INVALID_VALUES" };

    const entities = pairs.map(setting => settingModel.modify({ fValue: setting[1] }, { where: { fName: setting[0] } }));
    Promise.all(entities)
      .then(affections => {
        if(affections.some(affected => affected[0] !== 1)) throw { msg: "FAILED_UPDATE_SOME" };
        else  handleSuccess(res); })
      .catch(err => handleFailure(res, { err, route: req.originalUrl }) );
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
