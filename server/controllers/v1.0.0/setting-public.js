const express = require('express');
const Router = express.Router();

/**
 * Models
 */
const { settings: settingModel } = require('../../models');

/**
 * Helpers
 */
const {
  handleSuccess,
  handleFailure
} = require('../../helpers/handleResponse');


Router.get('/day-off', async (req, res) => {
  try {
    const settings = await settingModel.loadAll([], {
      where: { fName: 'maxDayOff' }
    });
    handleSuccess(res, { settings });
  }
  catch (err) {
    handleFailure(res, { err, route: req.originalUrl });
  }
});

module.exports = Router;