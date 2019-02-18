var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');
var db = require('../fn/mysql-db');

const { AUTH_CONFIG, DATETIME_FORMAT_TYPE1 } = require('../config/config');

// Generate access-token
exports.generateAccessToken = userEntity => {
  let payload = {
    user: userEntity
  }

  let token = jwt.sign(payload, AUTH_CONFIG.SECRET, {
    expiresIn: AUTH_CONFIG.AC_LIFETIME
  });

  return token;
}

// Verify access-token
exports.verifyAccessToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(token);

  if (token) {
    jwt.verify(token, AUTH_CONFIG.SECRET, (err, payload) => {
      if (err) {
        res.statusCode = 401;
        if (err.name === 'TokenExpiredError') {
          res.json({
            msg: 'TOKEN_EXPIRED'
          });
        } else {
          res.json({
            msg: 'INVALID_TOKEN'
          });
        }
      } else {
        console.log('[SUCCESS]->RefTokenRepo->VerifyAccessToken:', payload);
        req.payload = payload;
        next();
      }
    });
  }
  else {
    res.statusCode = 403;
    res.json({
      msg: 'NO_TOKEN'
    });
  }
};

// Generate Refresh Token
exports.generateRefreshToken = () => {
  return rndToken.generate(AUTH_CONFIG.REF_TOKEN_SIZE);
}

// Update Refresh Token
exports.updateRefreshToken = (userId, rfToken) => {
  let sql = `delete from userRefToken where fUserId = "${userId}"`;
  return new Promise((resolve, reject) => {
    db.save(sql)
      .then(value => {
        let rdt = moment().format(DATETIME_FORMAT_TYPE1);
        sql = `insert into userRefToken(fUserId, fRefToken, fRdt) values('${userId}', '${rfToken}', '${rdt}')`;
        return db.save(sql);
      })
      .then(value => resolve(value))
      .catch(err => reject(err));
  });
};

// Receive New Access Token
exports.receiveNewAccessToken = rfToken => {
  return new Promise((resolve, reject) => {
    let sql = `select fUserId from userRefToken where fRefToken = '${rfToken}'`;
    db.load(sql)
      .then(rows => {
        console.log('userID -> ');
        if (rows.length > 0) {
          let userId = rows[0].fUserId;
          console.log(userId);

          let sql_user = `select * from users where fId = "${userId}"`;
          db.load(sql_user)
            .then(rows_user => {
              console.log('user with id = ', userId);
              console.log('all found users: ', rows_user);

              if (rows_user.length > 0) {
                let userEntity = rows_user[0];
                let access_token = this.generateAccessToken(userEntity);
                resolve(access_token);
              } else {
                reject({
                  msg: "NO_USER_EXISTED"
                });
              }
            })
            .catch(err => reject({
                err,
                msg: "DB_QUERY_ERROR"
              })
            );
        } else {
          reject({
            msg: "NO_REFRESH_TOKEN"
          });
        }
      })
      .catch(err => reject({
          err,
          msg: "DB_QUERY_ERROR"
        })
      );
  });
}