const express = require("express");
const Router = express.Router();
const uid = require("rand-token").uid;

/**
 * Models
 */
const { userRefToken: refTokenModel, users: userModel } = require("../models");

/**
 * Configs
 */
const { USER_ID_LEN } = require("../configs/config");

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");
const { genRefToken } = require("../helpers/jwt");

/**
 * ADD NEW User
 */
Router.post("/account", async (req, res) => {
  try {
    const user = { ...req.body, id: uid(USER_ID_LEN) };
    await userModel.add(user);
    delete user.rawPwd;
    handleSuccess(res, { code: 201, user });
  } catch (err) {
    console.log("Controller > auth > addUser > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

/**
 * LOGIN user
 */
Router.post("/login", async (req, res) => {
  try {
    const { username, rawPwd } = req.body;
    if (!username || !rawPwd) throw { msg: "MISSING_REQUIRED_FIELDS" };

    const user = await userModel.login({
      fUsername: username,
      rawPwd
    });
    if (!user) throw { msg: "INVALID_USERNAME_PASSWORD" };

    const userEntity = user.get({ plain: true });
    const fRefToken = genRefToken();
    await refTokenModel.refresh({ fUserId: userEntity.fId, fRefToken });
    const accToken = await refTokenModel.genAccToken(fRefToken);

    handleSuccess(res, {
      access_token: accToken,
      refresh_token: fRefToken,
      fname: userEntity.firstName,
      lname: userEntity.lastName,
      typeId: userEntity.typeId
    });
  } catch (err) {
    console.log("Controller > auth > login > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

/**
 * GET new accessToken
 */
Router.get("/token", async (req, res) => {
  try {
    // validate refToken
    const fRefToken = req.headers["x-ref-token"];
    if (!fRefToken) throw { code: 401, msg: "NO_REFRESH_TOKEN" };
    await refTokenModel.validateRefToken(fRefToken);
    // refToken is valid, gen & return new accToken
    const accToken = await refTokenModel.genAccToken(fRefToken);
    handleSuccess(res, { access_token: accToken });
  } catch (err) {
    console.log("Controller > auth > getToken > err: ", err);
    const { code, msg } = err;
    handleFailure(res, { code, msg });
  }
});

module.exports = Router;
