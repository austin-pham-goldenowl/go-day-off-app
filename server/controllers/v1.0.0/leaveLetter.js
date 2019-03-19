const express = require("express");
const Router = express.Router();
const uid = require("rand-token").uid;
const { Op } = require("sequelize");
const moment = require("moment");
const dateArray = require('moment-array-dates');

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

/**
 * Constants
 */
const { FROM_OPTION, TO_OPTION, DEFAULT_PAGE_ORDER, DEFAULT_PAGE_SIZE,
  ALLOWED_PAGE_SIZE, WEEKEND_ORDERS } = require("../../configs/constants");

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
    const { fApprover } = letter;
    // only HR marked as approver in letter is able to view and approve it
    if (fUserType === "HR" && fApprover !== userId)
      throw { code: 401, msg: "NO_PERMISSION" };

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

    let { page = DEFAULT_PAGE_ORDER, size = DEFAULT_PAGE_SIZE } = req.query;
    if(page < 1 || isNaN(page)) page = DEFAULT_PAGE_ORDER;
    if(!ALLOWED_PAGE_SIZE.includes(+size)) size = DEFAULT_PAGE_SIZE;

    const userId = getIdFromToken(req.token_payload);
    const { rawLeaveLetters, count } = await leaveLetterModel.countAll([],
      {},
      { order: [["fRdt", "ASC"]] },
      { offset: (page - 1) * size },
      { limit: +size });

    // load user fullName
    const leaveLetters = [];
    await (async () => {
      for (let i = 0; i < rawLeaveLetters.length; i++) {
        const letter = rawLeaveLetters[i].get({ plain: true });
        const { fApprover, fUserId, fSubstituteId } = letter;
        // only HR marked as approver in letter is able to view and approve it
        if (userId !== fUserId && userId !== fApprover) continue;
        // user's fullName
        const users = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fUserId }
        });
        if (users.length) {
          const { fFirstName, fLastName } = users[0].get({ plain: true });
          letter.fUserFullName = fFirstName + " " + fLastName;
        }
        // approver's fullName
        const arrpovers = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fApprover }
        });
        if (arrpovers.length) {
          const { fFirstName, fLastName } = arrpovers[0].get({ plain: true });
          letter.fApproverFullName = fFirstName + " " + fLastName;
        }
        // substitute's fullName
        const substitutes = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fSubstituteId }
        });
        if (substitutes.length) {
          const { fFirstName, fLastName } = substitutes[0].get({ plain: true });
          letter.fSubstituteFullName = fFirstName + " " + fLastName;
        }

        leaveLetters.push(letter);
      }
    })();

    const numPages = Math.ceil(count / size);
    handleSuccess(res, { leaveLetters, numPages });
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
    // Check permission
    const userId = getIdFromToken(req.token_payload);
    const demandUserId = req.query.userId;
    if (!userId || !demandUserId) throw { msg: "USER_NOT_FOUND" };
    const userType = await getPermissionByToken(req.token_payload);
    // only HR can view all; others can view oneself's
    if(userId !== demandUserId && userType !== "HR") throw { code: 401, msg: "NO_PERMISSION" };

    let { page = DEFAULT_PAGE_ORDER, size = DEFAULT_PAGE_SIZE } = req.query;
    if(page < 1 || isNaN(page)) page = DEFAULT_PAGE_ORDER;
    if(!ALLOWED_PAGE_SIZE.includes(+size)) size = DEFAULT_PAGE_SIZE;

    const { rawLeaveLetters, count } = await leaveLetterModel.countAll([],
      { where: { fUserId: demandUserId }},
      { offset: (page - 1) * size },
      { limit: +size });

    const leaveLetters = [];
    await (async () => {
      for (let i = 0; i < rawLeaveLetters.length; i++) {
        const letter = rawLeaveLetters[i].get({ plain: true });
        const { fApprover, fUserId, fSubstituteId } = letter;
        // only HR marked as approver in letter is able to view and approve it
        if (userId !== fUserId && userId !== fApprover) continue;
        // user's fullName
        const users = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fUserId }
        });
        if (users.length) {
          const { fFirstName, fLastName } = users[0].get({ plain: true });
          letter.fUserFullName = fFirstName + " " + fLastName;
        }
        // approver's fullName
        const arrpovers = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fApprover }
        });
        if (arrpovers.length) {
          const { fFirstName, fLastName } = arrpovers[0].get({ plain: true });
          letter.fApproverFullName = fFirstName + " " + fLastName;
        }
        // substitute's fullName
        const substitutes = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fSubstituteId }
        });
        if (substitutes.length) {
          const { fFirstName, fLastName } = substitutes[0].get({ plain: true });
          letter.fSubstituteFullName = fFirstName + " " + fLastName;
        }

        leaveLetters.push(letter);
      }
    })();

    const numPages = Math.ceil(count / size);
    handleSuccess(res, { success: true, leaveLetters, numPages });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.get("/filter", async (req, res) => {
  try {
    // validating query params
    const currentYear = moment().get("year");
    let { userId, fromMonth = "01", toMonth = "12",
      fromYear = currentYear, toYear = currentYear,
      page = DEFAULT_PAGE_ORDER, size = DEFAULT_PAGE_SIZE } = req.query;

    if(!userId) throw { msg: "INVALID_QUERY" };
    if(fromMonth && (isNaN(fromMonth) || fromMonth > 12)) throw { msg: "INVALID_QUERY" };
    if(toMonth && (isNaN(toMonth) || toMonth > 12 || toMonth < fromMonth)) throw { msg: "INVALID_QUERY" };
    if(fromYear && (isNaN(fromYear) || fromYear > currentYear)) throw { msg: "INVALID_QUERY" };
    if(toYear && (isNaN(toYear) || toYear < fromYear)) throw { msg: "INVALID_QUERY" };
    if(toYear > currentYear) toYear = currentYear;
    if(page < 1 || isNaN(page)) page = DEFAULT_PAGE_ORDER;
    if(!ALLOWED_PAGE_SIZE.includes(+size)) size = DEFAULT_PAGE_SIZE;

    // only HR can export all; others can export oneself's
    const fUserType = await getPermissionByToken(req.token_payload);
    if(fUserType !== "HR" && userId !== getIdFromToken((req.token_payload))) throw { code: 401, msg: "NO_PERMISSION" };

    const fromDate = moment(`${fromMonth}/01/${fromYear}`),
      toDate = moment(`${toMonth}/31/${toYear}`);
    const { rawLeaveLetters, count } = await leaveLetterModel.countAll([],
      { where: { fUserId: userId,
          fFromDT: { [Op.gte]: fromDate },
          fToDT: { [Op.lte]: toDate }
      }},
      { offset: (page - 1) * size },
      { limit: +size },
      { order: [["fRdt", "ASC"]] });

    let numOffDays = 0;
    const leaveLetters = [];
    await (async () => {
      for (let i = 0; i < rawLeaveLetters.length; i++) {
        const letter = rawLeaveLetters[i].get({ plain: true });
        const { fUserId, fApprover, fSubstituteId } = letter;
        // user's fullName
        const users = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fUserId }
        });
        if (users.length) {
          const { fFirstName, fLastName } = users[0].get({ plain: true });
          letter.fUserFullName = fFirstName + " " + fLastName;
        }
        // approver's fullName
        const arrpovers = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fApprover }
        });
        if (arrpovers.length) {
          const { fFirstName, fLastName } = arrpovers[0].get({ plain: true });
          letter.fApproverFullName = fFirstName + " " + fLastName;
        }
        // substitute's fullName
        const substitutes = await userModel.loadAll(["fFirstName", "fLastName"], {
          where: { fId: fSubstituteId }
        });
        if (substitutes.length) {
          const { fFirstName, fLastName } = substitutes[0].get({ plain: true });
          letter.fSubstituteFullName = fFirstName + " " + fLastName;
        }
        // add the customized letter to result
        leaveLetters.push(letter);

        // count how many off days used
        const {fFromDT, fToDT, fFromOpt, fToOpt} = letter;
        if (fFromOpt === FROM_OPTION.AFTERNOON) {
          numOffDays += 0.5;
          numOffDays += moment(fToDT).diff(moment(fFromDT), 'days');
        }
        // not duplicated at all
        if (fToOpt !== TO_OPTION.ALLDAY) {
          numOffDays += 0.5;
          numOffDays += moment(fToDT).diff(moment(fFromDT), 'days');
        }
        // neither of above cases
        if (fFromOpt !== FROM_OPTION.AFTERNOON && fToOpt === TO_OPTION.ALLDAY)
          numOffDays += moment(fToDT).diff(moment(fFromDT), 'days') + 1;
        // exclude weekend
        const datesArray = dateArray.range(fFromDT, fToDT, 'MM/DD/YYYY');
        for (let j = 0; j < datesArray.length; j++) {
          const isWeekend = WEEKEND_ORDERS.includes(moment(datesArray[j]).day());
          if (isWeekend) {
            // if the date was same as fFromDT, check if half day
            if (fFromOpt === FROM_OPTION.AFTERNOON) numOffDays -= 0.5;
            // if the date was same as fToDT, check if half day
            else if (fToOpt !== TO_OPTION.ALLDAY) numOffDays -= 0.5;
            // other than that simply subtract 1 day
            else numOffDays -= 1;
          }
        }
      }
    })();

    const numPages = Math.ceil(count / size);
    handleSuccess(res, { leaveLetters, numOffDays, numPages });
  } catch(err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
