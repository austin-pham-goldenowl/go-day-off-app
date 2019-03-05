export default (sequelize, DataTypes) => {
  const Position = sequelize.define("positions",
    {
      fId: {
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING(5)
      },
      fPosName: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "positions" });

  Position.loadAll = (params = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          attributes: params
        };
        if (Object.keys(queryWhere).length > 0) query.where = queryWhere;
        const positions = await Position.findAll(query);
        resolve(positions);
      } catch (err) {
        reject(err);
      }
    });

  Position.delete = (queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          where: queryWhere
        };
        const result = await Position.destroy(query);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  Position.modify = (params = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          where: queryWhere
        };
        const modifiedPosition = Position.update(params, query);
        const result = {
          position: modifiedPosition.get({ plain: true }),
          success: true
        };
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  Position.add = (params = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const pos = await Position.create(params);
        const result = {
          pos: pos.get({ plain: true }),
          success: true
        };
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

  return Position;
};
