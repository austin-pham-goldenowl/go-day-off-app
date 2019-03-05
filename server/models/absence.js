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
    { timestamps: false, freezeTableName: true, tableName: "absencesTypes" });

  Absence.loadAll = (params = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          attributes: params,
          where: queryWhere
        };
        const absenceTypes = await Absence.findAll(query);
        resolve(absenceTypes);
      } catch (err) {
        reject(err);
      }
    });

  return Absence;
};
