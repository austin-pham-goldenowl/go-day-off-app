const express = require('express');
const Router = express.Router();

/**
 * Helpers
 */
const {
  handleSuccess,
  handleFailure
} = require('../../helpers/handleResponse');
const { standardizeObj } = require('../../helpers/standardize');

/**
 * Middlewares
 */
const bodyMustNotEmpty = require('../../middlewares/bodyMustNotEmpty');

/**
 * Models
 */
const {
  rejectedLetterDetail: rejectModel,
  leaveLetters: leaveLetterModel
} = require('../../models');

Router.get('/', async (req, res) => {
  try {
    const fLetterId = req.query.id;
    if (!fLetterId) throw { msg: 'INVALID_QUERY' };
    const rejects = await rejectModel.loadAll([], {
      where: { fLetterId }
    });
    if (!rejects || rejects.length !== 1) throw { msg: 'REJECTION_NOT_FOUND' };

    // check if leave letter corresponding with rejection exists
    const reject = rejects[0];
    const letters = await leaveLetterModel.loadAll([], {
      where: { fId: fLetterId }
    });
    if (!letters || letters.length !== 1) throw { msg: 'REJECTION_NOT_FOUND' };

    handleSuccess(res, { reject });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

Router.post('/', bodyMustNotEmpty, async (req, res) => {
  try {
    const entity = standardizeObj(req.body);
    // validate rejectType value
    if (
      (entity.fRejectType || 1) &&
      !rejectModel.rawAttributes.fRejectType.values.includes(entity.fRejectType)
    )
      throw { msg: 'INVALID_VALUES' };

    entity.leaveLetters_fId = entity.fLetterId;
    await rejectModel.add({
      ...entity
    });

    // update leave letter status
    await leaveLetterModel.modify({ fStatus: 3 },
      { where: { fId: entity.fLetterId } });
    handleSuccess(res, { rejection: entity });
  } catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;
