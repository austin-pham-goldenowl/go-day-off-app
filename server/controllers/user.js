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
Router.get("/profile", (req, res) => {
  const payload = req.token_payload;
  if (payload) handleSuccess(res, { msg: "/me -> payload", payload });
  else handleFailure(res, { msg: "SOMETHING_WENT_WRONG" });
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
  else handleFailure(res, { msg: "SOMETHING_WENT_WRONG" });
});

// Update user profile
Router.patch("/profile", async (req, res) => {
  try {
    const userEntity = req.body.info;
    const userId = req.body.id;
    if (Object.keys(userEntity).length === 0 || !userId)
      throw { code: 400, msg: "INVALID_VALUES" };

    const affected = await userModel.modify(standardizeObj(userEntity), {
      where: { fId: userId }
    });
    if (affected[0] < 1) throw { msg: "USER_NOT_FOUND" };

    handleSuccess(res);
  } catch (err) {
    console.log("Controller > user > update > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

module.exports = Router;
