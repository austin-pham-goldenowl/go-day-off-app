var db = require('../fn/mysql-db');

exports.loadAll = () => {
  let sql = `select fId as ID, fAbsenceTypeName as AbsType_Name from absenceTypes`;
  return db.load(sql);
}