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
      foreignKey: "fId",
      as: "leaveLetters_fId"
    });
  };

  return RejectedLetter;
};
