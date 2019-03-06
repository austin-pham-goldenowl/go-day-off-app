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

  Team.loadAll = (params = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          attributes: params,
          where: queryWhere
        };
        const teams = await Team.findAll(query);
        resolve(teams);
      } catch (err) {
        reject(err);
      }
    });

  Team.delete = (queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          where: queryWhere
        };
        const result = await Team.destroy(query);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  Team.add = (params = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const team = await Team.create(params);
        const result = {
          team: team.get({ plain: true }),
          success: true
        };
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  Team.modify = (params = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          where: queryWhere
        };
        const modifiedTeam = await Team.update(params, query);
        const result = {
          team: modifiedTeam.get({ plain: true }),
          success: true
        };
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  return Team;
};
