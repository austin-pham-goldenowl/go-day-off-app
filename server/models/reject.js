export default (sequelize, DataTypes) => {
  const RejectedLetter = sequelize.define("rejectedLetterDetail",
    {
      fLetterId: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      fReason: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      fRejectType: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "rejectedLetterDetail"
    });

  RejectedLetter.associate = models => {
    RejectedLetter.belongsTo(models.leaveLetters, {
      foreignKey: { name: "leaveLetters_fId", allowNull: false }
    });
  };

  RejectedLetter.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        let rejections = null;
        if (attributes.length < 1)
          rejections = await RejectedLetter.findAll({
            ...queryWhere
          });
        else
          rejections = await RejectedLetter.findAll({
            attributes,
            ...queryWhere
          });
        resolve(rejections);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  RejectedLetter.add = rejectEntity =>
    new Promise(async (resolve, reject) => {
      try {
        const rejection = await RejectedLetter.create(rejectEntity);
        resolve(rejection);
      } catch (err) {
        {
          err.code = 500;
          err.msg = "DB_QUERY_ERROR";
          reject(err);
        }
      }
    });

  return RejectedLetter;
};
