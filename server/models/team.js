export default (sequelize, DataTypes) => {
  const Team = sequelize.define("teams",
    {
      fId: {
        primaryKey: true,
        type: DataTypes.STRING(5)
      },
      fTeamName: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      fTeamLead: {
        type: DataTypes.STRING(10),
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "teams",
      classMethods: {
        associate: models => {
          Team.belongsTo(models.users, { foreignKey: "users_fId" });
        }
      }
    });

  Team.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        let teams = null;
        if (attributes.length < 1)
          teams = await Team.findAll({
            ...queryWhere
          });
        else
          teams = await Team.findAll({
            attributes,
            ...queryWhere
          });
        resolve(teams);
      } catch (err) {
        reject(err);
      }
    });

  return Team;
};
