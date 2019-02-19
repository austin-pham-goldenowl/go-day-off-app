var express = require('express');
var router = express.Router();

var userRepo = require('../repo/userRepo');

// Get user profile
router.get('/profile', (req, res) => {
  let payload = req.token_payload;
  console.log('userRepo -> \'/me\' -> payload: ', payload);
  res.json({
      msg: "/me -> payload",
      payload: payload
  });
});

// Get user id
router.get('/id', (req, res) => {
  let payload = req.token_payload;
  res.json({
    id: payload.user.fId
  });
})

// Update user profile 
router.patch('/profile', (req, res) => {
  let userEntity = req.body.info;
  let userId = req.body.user.id;

  console.log('userCtrl -> PATCH \'/profile\': ', userEntity);
  if (Object.keys(userEntity).length > 0) {
  userRepo.update(userEntity, userId)
    .then(value => {
      res.json({
        msg: 'Profile updated successfully',
        userEntity
      });
    })
    .catch(err => {
      res.statusCode = 500;
      res.json({
        msg: 'SOMETHING\'S WRONG WITH DATABASE SERVER',
      });
    })
  } else {
    res.statusCode = 400;
    res.json({
      msg: 'N0_VALUE'
    });
  }
});

module.exports = router;