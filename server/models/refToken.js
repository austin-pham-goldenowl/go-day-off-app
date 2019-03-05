import jwt from "jsonwebtoken";
import moment from "moment";

/**
 * Configs
 */
import { AUTH_CONFIG, DATETIME_FORMAT_TYPE1 } from "../configs/config";

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
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "userRefToken",
      classMethods: {
        associate: models => {
          RefToken.belongsTo(models.User, { foreignKey: "users_fId" });
        }
      }
    });

  RefToken.refresh = ({ fUserId, fRefToken }) =>
    new Promise(async (resolve, reject) => {
      try {
        const fRdt = moment().format(DATETIME_FORMAT_TYPE1);
        await RefToken.destroy({ where: { fUserId } });
        await RefToken.create({ fUserId, fRefToken, fRdt });
        resolve();
      } catch (err) {
        err.code = 500;
        reject(err);
      }
    });

  RefToken.validateRefToken = fRefToken =>
    new Promise(async (resolve, reject) => {
      try {
        const result = await RefToken.findOne({ where: { fRefToken } });
        if (!result) throw { code: 401, msg: "INVALID_REFRESH_TOKEN" };
        resolve({ success: true });
      } catch (err) {
        reject(err);
      }
    });

  RefToken.genAccToken = fRefToken =>
    new Promise(async (resolve, reject) => {
      try {
        const userId = await RefToken.findOne({
          attributes: ["fUserId"],
          where: { fRefToken }
        });
        if (!userId) throw { code: 401, msg: "NO_REFRESH_TOKEN" };

        const access_token = jwt.sign({ userId }, AUTH_CONFIG.SECRET, {
          expiresIn: AUTH_CONFIG.AC_LIFETIME
        });
        resolve(access_token);
      } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.msg) err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  return RefToken;
};
