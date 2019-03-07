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

  Permission.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        let permissions = null;
        if (attributes.length < 1)
          permissions = await Permission.findAll({
            ...queryWhere
          });
        else
          permissions = await Permission.findAll({
            attributes,
            ...queryWhere
          });
        resolve(permissions);
      } catch (err) {
        reject(err);
      }
    });

  return Permission;
};
