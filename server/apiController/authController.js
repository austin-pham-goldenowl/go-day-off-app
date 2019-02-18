var express = require('express');
var router = express();
var uid = require('rand-token').uid;

var authRepo = require('../repo/authRepo');
var refTokenRepo = require('../repo/refTokenRepo');

const { USER_ID_LEN } = require('../config/config');
/**
 * ADD NEW User
 */

router.post('/account', (req, res) => {
  let genId = uid(USER_ID_LEN);
  authRepo.addAccount(req.body, genId)
    .then(value => {
      console.log('[SUCCESS] authCtrl -> \'add\' -> value: ', value);
      res.statusCode = 201;
      res.json(req.body);
    })
    .catch(err => {
      console.log('[FAIL] authCtrl -> \'add\' -> err: ', err);
      res.statusCode = 500;
      res.end({
        msg: "View error log on console."
      });
    });
});

/**
 * LOGIN user
 */
router.post('/login', (req, res) => {
  authRepo.login(req.body)
    .then(rows => {
      console.log('Rows length: ',rows.length);
      if (rows.length > 0) {
        let userEntity = rows[0];
        let rfToken = refTokenRepo.generateRefreshToken();
        let acToken = refTokenRepo.generateAccessToken(userEntity);

        refTokenRepo
          .updateRefreshToken(userEntity.fId, rfToken)
          .then(() => {
            res.json({
              auth: true,
              access_token: acToken,
              refresh_token: rfToken,
              fname: userEntity.fFirstName,
              lname: userEntity.fLastName,
              typeId: userEntity.fTypeId
            });
          })
          .catch(err => {
            console.log('[ERROR] -> authCtrl -> \'login\' -> updateRefToken: ', err);
            res.statusCode = 500;
            res.end({
              msg: 'View error log on console.'
            });
          });
      } else {
        res.json({
          auth: false
        });
      }
    })
    .catch(err => {
      console.log('[ERROR] -> authCtrl -> \'login\': ', err);
      res.statusCode = 500;
      res.end({
        msg: 'View error log on console.'
      });
    });
});

/**
 * GET new accessToken
 */

router.post('/token', (req, res) => {
  let refToken = req.headers['x-ref-token'];
  console.log(refToken);
  if (refToken !== '') {
    refTokenRepo.receiveNewAccessToken(refToken)
      .then(value => {
        console.log('[SUCCESS] -> authCtrl -> \'/token\': ', value);
        res.json({
          access_token: value
        });
      })
      .catch(err => {
        console.log('[FAIL] -> authCtrll -> \'/token\': ', err);
        if (err.msg === 'DB_QUERY_ERROR') {
          res.statusCode = 500;
          res.json({
            msg: 'Server error'
          });
        } else {
          res.statusCode = 401;
          res.json({
            msg: err.msg
          });
        }
      });
  } else {
    res.statusCode = 401;
    res.json({
      msg: "Unauthorized"
    });
  }
});

module.exports = router;