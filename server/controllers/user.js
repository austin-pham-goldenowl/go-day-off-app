const express = require("express");
const Router = express.Router();

/**
 * Models
 */
const { users: userModel } = require("../models");

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");
const { standardizeObj } = require("../helpers/standardize");

// Get user profile
Router.get("/profile", async (req, res) => {
  try {
    const fId =
      req.token_payload &&
      req.token_payload.userId &&
      req.token_payload.userId.fUserId;
    const attributes = [
      "fAddress",
      "fBday",
      "fEmail",
      "fFirstName",
      "fLastName",
      "fPhone",
      "fPosition",
      "fTeamId",
      "fTypeId",
      "fUsername"
    ];
    const user = await userModel.loadAll(attributes, { where: { fId } });
    if (!user || (user && user.length !== 1)) throw { msg: "USER_NOT_FOUND" };
    handleSuccess(res, { user: user[0] });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

// Get user id
Router.get("/id", (req, res) => {
  const fUserId =
    req.token_payload &&
    req.token_payload.userId &&
    req.token_payload.userId.fUserId;
  if (fUserId)
    handleSuccess(res, {
      fUserId
    });
  else {
    const err = { msg: "USER_NOT_FOUND" };
    handleFailure(res, { err, route: req.originalUrl });
  }
});

// Update user profile
Router.patch("/profile", async (req, res) => {
  try {
    const userEntity = req.body.info;
    const userId = req.body.id;
    if (!userEntity || Object.keys(userEntity).length < 1 || !userId)
      throw { msg: "INVALID_VALUES" };

    const affected = await userModel.modify(standardizeObj(userEntity), {
      where: { fId: userId }
    });
    if (affected[0] < 1) throw { msg: "USER_NOT_FOUND" };

    handleSuccess(res, { user: userEntity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
