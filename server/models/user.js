import sha256 from "sha256";

/**
 * Helpers
 */
import { standardizeObj } from "../helpers/standardize";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("users",
    {
      fId: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      fFirstName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      fLastName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      fBday: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fPosition: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      fAddress: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      fPhone: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      fTeamId: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      fTypeId: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      fEmail: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      fPassword: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      fUsername: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "users",
      classMethods: {
        associate: models => {
          User.belongsTo(models.userPermission, {
            foreignKey: "userPermission_fId"
          });
          User.belongsTo(models.teams, { foreignKey: "teams_fId" });
          User.belongsTo(models.positions, {
            foreignKey: "positions_fId"
          });
        }
      }
    });

  const permittedFields = [
    "fAddress",
    "fBday",
    "fEmail",
    "fFirstName",
    "fPassword",
    "fLastName",
    "fPhone",
    "fPosition",
    "fTeamId",
    "fTypeId",
    "fUsername"
  ];
  const publicFields = permittedFields.filter(field => field === "fPassword");

  User.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await User.findAll({ attributes, ...queryWhere });
        resolve(users);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  User.modify = (attributes = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const affected = await User.update(attributes, queryWhere);
        resolve(affected);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  User.add = ({ rawPwd, ...others }) =>
    new Promise(async (resolve, reject) => {
      try {
        const userEntity = standardizeObj({
          password: sha256(rawPwd),
          ...others
        });

        const user = await User.create(userEntity);
        resolve(user);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  User.login = ({ fUsername, rawPwd }) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          where: {
            fUsername,
            fPassword: sha256(rawPwd)
          }
        });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });

  return User;
};
