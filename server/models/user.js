import sha256 from "sha256";

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
        allowNull: true
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
      },
      fGender: {
        type: DataTypes.ENUM,
        values: [1, 2, 3], // 1: female, 2: male, 3: others
        allowNull: false,
        defaultValue: 3
      },
      userPermission_fId: {
        type: DataTypes.STRING(5)
      },
      teams_fId: {
        type: DataTypes.STRING(5)
      },
      positions_fId: {
        type: DataTypes.STRING(5)
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
          User.belongsTo(models.teams, {
            foreignKey: "teams_fId"
          });
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
    "fUsername",
    "fGender"
  ];
  const publicFields = permittedFields.filter(field => field === "fPassword");

  User.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await User.findAll({ attributes, ...queryWhere });
        resolve(users);
      } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.msg) err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  User.modify = (attributes = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const affected = await User.update(attributes, queryWhere);
        resolve(affected);
      } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.msg) err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  User.add = ({ fRawPwd, ...others }) =>
    new Promise(async (resolve, reject) => {
      try {
        const entity = {
          fPassword: sha256(fRawPwd),
          ...others
        };
        const user = await User.create(entity);
        delete user.fPassword;
        resolve(user);
      } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.msg) err.msg = "DB_QUERY_ERROR";
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
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  return User;
};
