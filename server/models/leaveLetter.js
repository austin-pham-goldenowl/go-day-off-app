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

  LeaveLetter.loadAll = (params = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          attributes: params,
          where: queryWhere
        };
        const letters = await LeaveLetter.findAll(query);
        resolve(letters);
      } catch (err) {
        reject(err);
      }
    });

  LeaveLetter.delete = (queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          where: queryWhere
        };
        const result = await LeaveLetter.destroy(query);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  LeaveLetter.add = (params = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const letter = await LeaveLetter.create(params);
        const result = {
          letter: letter.get({ plain: true }),
          success: true
        };
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  LeaveLetter.modify = (params = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          where: queryWhere
        };
        const modifiedLetter = await LeaveLetter.update(params, query);
        const result = {
          letter: modifiedLetter.get({ plain: true }),
          success: true
        };
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  return LeaveLetter;
};
