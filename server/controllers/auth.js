const Router = require("express").Router();
const uid = require("rand-token").uid;

/**
 * Models
 */
const { userModel, refTokenModel } = require("../models");

/**
 * Configs
 */
const { USER_ID_LEN } = require("../config/config");

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");

/**
 * ADD NEW User
 */
Router.post("/account", async (req, res) => {
  try {
    const userEntity = { ...req.body, fId: uid(USER_ID_LEN) };
    await userModel.add(userEntity);
    handleSuccess(res, { code: 201, created: userEntity });
  } catch (err) {
    console.log("Controller > auth > addUser -> err", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

/**
 * LOGIN user
 */
Router.post("/login", async (req, res) => {
  try {
    const { username, password: rawPwd } = req.body;
    if (!username || !rawPwd) throw { msg: "Missing some of required fields" };

    const user = await userModel.login({
      fUsername: username,
      rawPwd
    });
    if (user.length < 1)
      throw { msg: "User not found or wrong username and/or password" };

    const userEntity = user[0];
    const refToken = refTokenModel.genRefToken();
    const accToken = await refTokenModel.genAccToken(userEntity);

    await refTokenModel.refresh({ userId: userEntity.id, refToken });
    handleSuccess(res, {
      access_token: accToken,
      refresh_token: refToken,
      fname: userEntity.firstName,
      lname: userEntity.lastName,
      typeId: userEntity.typeId
    });
  } catch (err) {
    console.log("Controller > auth > login -> err", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

/**
 * GET new accessToken
 */

Router.get("/token", async (req, res) => {
  try {
    const refToken = req.headers["x-ref-token"];
    if (!refToken) throw { code: 401, msg: "Unauthorized" };

    const accToken = await refTokenModel.genAccToken(refToken);
    handleSuccess(res, { access_token: accToken });
  } catch (err) {
    console.log("Controller > auth > getToken -> err", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

module.exports = Router;
