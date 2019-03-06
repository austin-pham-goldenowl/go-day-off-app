import moment from "moment";

/**
 * Configs
 */
import { DATETIME_FORMAT_TYPE1 } from "../configs/config";

export default (sequelize, DataTypes) => {
  const LeaveLetter = sequelize.define("leaveLetters",
    {
      fId: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      fRdt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fFromDT: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fToDT: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fAbsenceType: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fSubstituteId: {
        type: DataTypes.STRING(10)
      },
      fUserId: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      users_fId: {
        type: DataTypes.STRING(10)
      },
      users_fId1: {
        type: DataTypes.STRING(10)
      },
      absenceTypes_fId: {
        type: DataTypes.INTEGER
      },
      fStatus: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "leaveLetters",
      classMethods: {
        associate: models => {
          LeaveLetter.belongsTo(models.absenceTypes, {
            foreignKey: "absenceTypes_fId"
          });
          LeaveLetter.belongsTo(models.users, { foreignKey: "users_fId" });
          LeaveLetter.belongsTo(models.users, {
            foreignKey: "users_fId1"
          });
        }
      }
    });

  const permittedFields = [
    "fAbsenceType",
    "fFromDt",
    "fId",
    "fRdt",
    "fStatus",
    "fSubstituteId",
    "fToDT",
    "fUserId"
  ];

  LeaveLetter.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        console.log(queryWhere);
        const leaveLetters = await LeaveLetter.findAll({
          attributes,
          ...queryWhere
        });
        resolve(leaveLetters);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  LeaveLetter.delete = (queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const result = await LeaveLetter.destroy(queryWhere);
        resolve(result);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  LeaveLetter.add = (params = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        params.fRdt = moment().format(DATETIME_FORMAT_TYPE1);
        const leaveLetter = await LeaveLetter.create(params);
        const result = {
          leaveLetter: leaveLetter.get({ plain: true })
        };
        resolve(result);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  LeaveLetter.modify = (attributes = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const affected = await LeaveLetter.update(attributes, queryWhere);
        resolve(affected);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  return LeaveLetter;
};
