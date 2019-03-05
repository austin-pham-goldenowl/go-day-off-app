export default (sequelize, DataTypes) => {
  const Permission = sequelize.define("userPermission",
    {
      fId: {
        primaryKey: true,
        type: DataTypes.STRING(5)
      },
      fUserType: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "userPermission" });

  Permission.loadAll = (params = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          attributes: params,
          where: queryWhere
        };
        const permissions = await Permission.findAll(query);
        resolve(permissions);
      } catch (err) {
        reject(err);
      }
    });

  return Permission;
};
