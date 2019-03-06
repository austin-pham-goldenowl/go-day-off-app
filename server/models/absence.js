export default (sequelize, DataTypes) => {
  const Absence = sequelize.define("absenceTypes",
    {
      fId: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      fAbsenceTypeName: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "absenceTypes" });

  Absence.loadAll = (attributes = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        let absenceTypes = null;
        if (attributes.length < 1)
          absenceTypes = await Absence.findAll({
            ...queryWhere
          });
        else
          absenceTypes = await Absence.findAll({
            attributes,
            ...queryWhere
          });
        resolve(absenceTypes);
      } catch (err) {
        reject(err);
      }
    });

  return Absence;
};
