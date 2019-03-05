const Router = require("express").Router();

/**
 * Models
 */
const { userModel } = require("../models");

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");

// Get user profile
Router.get("/profile", (req, res) => {
  const payload = req.token_payload;
  if (payload) handleSuccess(res, { msg: "/me -> payload", payload });
  else handleFailure(res, { msg: "SOMETHING_WENT_WRONG" });
});

// Get user id
Router.get("/id", (req, res) => {
  const id =
    req.token_payload && req.token_payload.user && req.token_payload.user.fId;
  if (id)
    handleSuccess(res, {
      id
    });
  else handleFailure(res, { msg: "SOMETHING_WENT_WRONG" });
});

// Update user profile
Router.patch("/profile", async (req, res) => {
  try {
    const userEntity = req.body.info;
    const userId = req.body.user && req.body.user.id;

    if (Object.keys(userEntity).length === 0 || !userId)
      throw { code: 400, msg: "NO_VALUE" };

    const user = await userModel.modify(userEntity, { fId: userId });
    handleSuccess(res, { user });
  } catch (err) {
    console.log("[Controller][user][update]: catch -> err", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});
