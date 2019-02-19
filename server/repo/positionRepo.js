var db = require('../fn/mysql-db');

exports.loadAll = () => {
  let sql = `select fId as ID, fPosName as PositionName from positions`;
  return db.load(sql);
}

exports.loadById = (posId) => {
  let sql = `select fPosName as PositionName from positions where fId = ${posId}`;
  return db.load(sql);
}

exports.loadByName = (posName) => {
  let sql = `select fId as ID, fPosName as PositionName from positions where fPosName like "${posName}"`;
  return db.load(sql);
}

exports.deleteById = (posId) => {
  let sql = `delete from positions where fPosId = ${posId}`;
  return db.save(sql);
}

exports.updateById = (posName, posId) => {
  let sql = `update positions set fPosName = ${posName} where fPosId = "${post}"`;
  return db.save(sql);
}

exports.add = (posInfo) => {
  let sql = `insert into postitions(fId, fPosName) value("${posInfo.id}", "${posInfo.name}")`;
  return db.save(sql);
}