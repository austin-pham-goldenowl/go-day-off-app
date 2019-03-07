const express = require("express");
const Router = express.Router();
const uid = require("rand-token").uid;

/**
 * Models
 */
const { leaveLetters: leaveLetterModel } = require("../../models");

/**
 * Configs
 */
const { LEAVING_FORM_ID_LEN } = require("../../configs/config");

/**
 * Helpers
 */
const {
  handleSuccess,
  handleFailure
} = require("../../helpers/handleResponse");
const { standardizeObj } = require("../../helpers/standardize");
const {
  getIdFromToken,
  getPermissionByToken
} = require("../../helpers/getUserInfo");

Router.get("/details", async (req, res) => {
  try {
    // validate if userPermission is permitted
    const fUserType = await getPermissionByToken(req.token_payload);
    if (!fUserType) throw { code: 401, msg: "NO_PERMISSION" };

    // others can view oneself's
    const fId = req.query.id;
    if (!fId) throw { msg: "INVALID_QUERY" };

    const letters = await leaveLetterModel.loadAll(["fUserId"], {
      where: { fId }
    });
    if (!letters || letters.length !== 1) throw { msg: "LETTER_NOT_FOUND" };
    const { fUserId } = letters[0].get({ plain: true });

    const userId = getIdFromToken(req.token_payload);
    if (fUserType !== "HR" && userId !== fUserId)
      throw { code: 401, msg: "NO_PERMISSION" };

    // only HR can view everyone's
    const leaveLetters = await leaveLetterModel.loadAll([], {
      where: { fId }
    });
    if (!leaveLetters || leaveLetters.length !== 1)
      throw { msg: "LETTER_NOT_FOUND" };

    handleSuccess(res, { leaveLetter: leaveLetters[0] });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.get("/", async (req, res) => {
  try {
    const userType = await getPermissionByToken(req.token_payload);
    if (userType !== "HR") throw { code: 401, msg: "NO_PERMISSION" };
    const leaveLetters = await leaveLetterModel.loadAll();
    handleSuccess(res, { leaveLetters });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.post("/", async (req, res) => {
  try {
    if (Object.keys(req.body).length < 1) throw { msg: "INVALID_VALUES" };

    const id = uid(LEAVING_FORM_ID_LEN);
    const entity = standardizeObj({ ...req.body, id });

    const { fStatus, fFromDT, fToDT } = entity;
    // validate status value
    if (
      (fStatus || 3) &&
      !leaveLetterModel.rawAttributes.fStatus.values.includes(fStatus)
    )
      throw { msg: "INVALID_VALUES" };

    // validate whether fromDT <= toDT
    if (fFromDT && fToDT && new Date(fFromDT) > new Date(fToDT))
      throw { msg: "INVALID_VALUES" };

    // add foreign keys
    const { fUserId, fAbsenceType } = entity;
    entity.absenceTypes_fId = fAbsenceType;
    entity.users_fId = fUserId;
    entity.users_fId1 = fUserId;
    const leaveLetter = await leaveLetterModel.add(entity);

    handleSuccess(res, { code: 201, leaveLetter });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.patch("/", async (req, res) => {
  try {
    // validate if userPermission is permitted
    const fUserType = await getPermissionByToken(req.token_payload);
    if (!fUserType) throw { code: 401, msg: "NO_PERMISSION" };
    // others can update oneself's
    const entity = standardizeObj(req.body.info);
    const userId = getIdFromToken(req.token_payload);
    const { fUserId } = entity;
    if (fUserType !== "HR" && userId !== fUserId)
      throw { code: 401, msg: "NO_PERMISSION" };

    // only HR can update everyone's
    const fId = req.body.id;
    if (!entity || Object.keys(entity).length < 1 || !fId)
      throw { msg: "INVALID_VALUES" };

    const { fStatus, fFromDT, fToDT } = entity;
    // validate status value
    if (
      (fStatus || 3) &&
      !leaveLetterModel.rawAttributes.fStatus.values.includes(fStatus)
    )
      throw { msg: "INVALID_VALUES" };

    // validate whether fromDT <= toDT
    if (fFromDT && fToDT && new Date(fFromDT) > new Date(fToDT))
      throw { msg: "INVALID_VALUES" };

    // update foreign keys
    const { fAbsenceType } = entity;
    if (fAbsenceType) entity.absenceTypes_fId = fAbsenceType;
    if (fUserId) {
      entity.users_fId = fUserId;
      entity.users_fId1 = fUserId;
    }

    const affected = await leaveLetterModel.modify(entity, {
      where: { fId, fUserId }
    });
    if (affected[0] < 1) throw { msg: "LETTER_NOT_FOUND" };

    handleSuccess(res, { leaveLetter: entity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
