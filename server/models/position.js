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

  Position.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        let positions = null;
        if (attributes.length < 1)
          positions = await Position.findAll({
            ...queryWhere
          });
        else
          positions = await Position.findAll({
            attributes,
            ...queryWhere
          });
        resolve(positions);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  return Position;
};
