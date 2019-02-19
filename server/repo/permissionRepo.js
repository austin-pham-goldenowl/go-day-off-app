var db = require('../fn/mysql-db');

exports.loadAll = () => {
  let sql = `select fId as ID, fUserType as UserType from userPermission`;
  return db.load(sql);
}