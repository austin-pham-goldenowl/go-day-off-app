const express = require("express");
const Router = express.Router();

/**
 * Helpers
 */
const {
  handleSuccess,
  handleFailure
} = require("../../helpers/handleResponse");
const { standardizeObj } = require("../../helpers/standardize");

/**
 * Models
 */
const {
  rejectedLetterDetail: rejectModel,
  leaveLetters: leaveLetterModel
} = require("../../models");

Router.get("/", async (req, res) => {
  try {
    const fLetterId = req.query.id;
    if (!fLetterId) throw { msg: "INVALID_QUERY" };
    const rejects = await rejectModel.loadAll([], {
      where: { fLetterId }
    });
    if (!rejects || rejects.length !== 1) throw { msg: "REJECTION_NOT_FOUND" };

    // check if leave letter corresponding with rejection exists
    const reject = rejects[0];
    const letters = await leaveLetterModel.loadAll([], {
      where: { fId: fLetterId }
    });
    if (!letters || letters.length !== 1) throw { msg: "REJECTION_NOT_FOUND" };

    handleSuccess(res, { reject });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.post("/", async (req, res) => {
  try {
    const rejectEntity = req.body;
    if (Object.keys(rejectEntity) < 1) throw { msg: "INVALID_VALUES" };

    // check if leave letter corresponding with rejection exists
    const letters = await leaveLetterModel.loadAll([], {
      where: { fId: rejectEntity.letterId }
    });
    if (!letters || letters.length !== 1) throw { msg: "LETTER_NOT_FOUND" };

    await rejectModel.add({
      ...standardizeObj(rejectEntity),
      leaveLetters_fId: rejectEntity.letterId
    });
    // update leave letter status
    await leaveLetterModel.modify({ fStatus: 2 },
      { where: { fId: rejectEntity.letterId } });
    handleSuccess(res, { rejection: rejectEntity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
