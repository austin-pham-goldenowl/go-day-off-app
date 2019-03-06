const express = require("express");
const Router = express.Router();
const uid = require("rand-token").uid;

/**
 * Models
 */
const {
  leaveLetters: leaveLetterModel,
  rejectedLetterDetail: rejectedLetterModel
} = require("../models");

/**
 * Configs
 */
const { LEAVING_FORM_ID_LEN } = require("../configs/config");

/**
 * Helpers
 */
const { handleSuccess, handleFailure } = require("../helpers/handleResponse");
const { standardizeObj } = require("../helpers/standardize");

Router.get("/details", async (req, res) => {
  try {
    const fId = req.query.id;
    if (!fId) throw { msg: "INVALID_VALUES" };

    const attributes = [
      "fAbsenceType",
      "fFromDt",
      "fId",
      "fRdt",
      "fStatus",
      "fSubstituteId",
      "fToDT",
      "fUserId"
    ];
    const leaveLetters = await leaveLetterModel.loadAll(attributes, {
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
    const leaveLetterEntity = { ...req.body, id };
    await leaveLetterModel.add(standardizeObj(leaveLetterEntity));

    handleSuccess(res, { code: 201, leaveLetter: leaveLetterEntity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.patch("/details", async (req, res) => {
  try {
    const leaveLetterEntity = req.body.info;
    const fId = req.body.id;
    if (!leaveLetterEntity || Object.keys(leaveLetterEntity).length < 1 || !fId)
      throw { msg: "INVALID_VALUES" };

    const affected = await leaveLetterModel.modify(standardizeObj(leaveLetterEntity),
      { where: { fId } });
    if (affected[0] < 1) throw { msg: "LETTER_NOT_FOUND" };

    handleSuccess(res, { leaveLetter: leaveLetterEntity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
