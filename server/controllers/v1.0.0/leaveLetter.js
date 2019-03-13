const express = require("express");
const Router = express.Router();
const uid = require("rand-token").uid;

/**
 * Models
 */
const {
  leaveLetters: leaveLetterModel,
  users: userModel
} = require("../../models");

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

    // load substitute fullName
    const letter = leaveLetters[0].get({ plain: true });
    const { fSubstituteId } = letter;
    const users = await userModel.loadAll(["fFirstName", "fLastName"], {
      where: { fId: fSubstituteId }
    });
    if (users.length) {
      const { fFirstName, fLastName } = users[0].get({ plain: true });
      letter.fFullName = fFirstName + " " + fLastName;
    }

    handleSuccess(res, { leaveLetter: letter });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.get("/", async (req, res) => {
  try {
    const userType = await getPermissionByToken(req.token_payload);
    if (userType !== "HR") throw { code: 401, msg: "NO_PERMISSION" };

    const rawLeaveLetters = await leaveLetterModel.loadAll();
    // load user fullName
    let leaveLetters = [];
    await (async () => {
      for (let i = 0; i < rawLeaveLetters.length; i++) {
        const letter = rawLeaveLetters[i].get({ plain: true });
        const { fUserId } = letter;
        const users = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fUserId }
        });
        if (users.length) {
          const { fFirstName, fLastName } = users[0].get({ plain: true });
          letter.fFullName = fFirstName + " " + fLastName;
        }
        leaveLetters.push(letter);
      }
    })();

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
    const { fUserId, fAbsenceType, fApprover } = entity;
    entity.absenceTypes_fId = fAbsenceType;
    entity.users_fId = fUserId;
    entity.users_fId1 = fUserId;
    entity.approver_fId = fApprover;
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

    const affected = await leaveLetterModel.modify(entity, {
      where: { fId, fUserId }
    });
    if (affected[0] < 1) throw { msg: "LETTER_NOT_FOUND" };

    handleSuccess(res, { leaveLetter: entity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.get("/my-letters", async (req, res) => {
  try {
    const userId = getIdFromToken(req.token_payload);
    if (!userId) throw { msg: "USER_NOT_FOUND" };

    const leaveLetters = await leaveLetterModel.loadAll([], {
      where: { fUserId: userId }
    });

    handleSuccess(res, {
      success: true,
      leaveLetters: leaveLetters.map(lt => lt.get({ plain: true }))
    });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
