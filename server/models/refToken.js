const jwt = require("jsonwebtoken");
const moment = require("moment");
const rndToken = require("rand-token");

/**
 * Configs
 */
const { AUTH_CONFIG, DATETIME_FORMAT_TYPE1 } = require("../configs/config");

export default (sequelize, DataTypes) => {
  const RefToken = sequelize.define("userRefToken",
    {
      fUserId: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      fRefToken: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      fRdt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    { freezeTableName: true, tableName: "userRefToken" });

  RefToken.associate = models => {
    RefToken.belongsTo(models.User, { foreignKey: "fId", as: "users_fId" });
  };

  RefToken.refresh = ({ userId, refToken }) =>
    new Promise(async (resolve, reject) => {
      try {
        await RefToken.destroy({ where: { fUserId: userId } });
        const rdt = moment().format(DATETIME_FORMAT_TYPE1);
        const newRefToken = await RefToken.create({ userId, refToken, rdt });
        resolve(newRefToken);
      } catch (err) {
        err.code = 500;
        reject(err);
      }
    });

  RefToken.genAccToken = refToken =>
    new Promise(async (resolve, reject) => {
      try {
        const userId = await RefToken.findOne({
          attributes: ["fUserId"],
          where: { fRefToken: refToken }
        });
        if (userId.length < 1) throw { code: 401, msg: "NO_REFRESH_TOKEN" };

        const userEntity = await RefToken.findOne({
          where: { fId: userId }
        });
        if (userEntity.length < 1) throw { code: 401, msg: "NO_USER_EXISTED" };

        const access_token = jwt.sign({ user: userEntity },
          AUTH_CONFIG.SECRET,
          {
            expiresIn: AUTH_CONFIG.AC_LIFETIME
          });
        resolve(access_token);
      } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.msg) err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  RefToken.genRefToken = () => rndToken.generate(AUTH_CONFIG.REF_TOKEN_SIZE);

  RefToken.verifyAccToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (token) {
      jwt.verify(token, AUTH_CONFIG.SECRET, (err, payload) => {
        if (err) {
          const msg =
            err.name === "TokenExpiredError"
              ? "TOKEN_EXPIRED"
              : "INVALID_TOKEN";
          handleFailure(res, { code: 401, msg });
        } else {
          console.log("[SUCCESS]->RefTokenRepo->VerifyAccessToken:", payload);
          req.token_payload = payload;
          next();
        }
      });
    } else {
      handleFailure(res, { code: 403, msg: "NO_TOKEN" });
    }
  };

  return RefToken;
};
