export default (sequelize, DataTypes) => {
  const Setting = sequelize.define("settings",
    {
      fName: {
        primaryKey: true,
        type: DataTypes.STRING
      },
      fValue: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "settings" });

  Setting.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        let settings = null;
        if (attributes.length < 1)
          settings = await Setting.findAll({
            ...queryWhere
          });
        else
          settings = await Setting.findAll({
            attributes,
            ...queryWhere
          });
        // not send password
        settings = Array.from(settings)
          .filter(setting => !setting.get({ plain: true }).fValue.includes("password"));
        resolve(settings);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  Setting.save = (attributes = {}, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const affected = await Setting.upsert(attributes, queryWhere);
        resolve(affected);
      } catch (err) {
        if (!err.code) err.code = 500;
        if (!err.msg) err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  return Setting;
};
