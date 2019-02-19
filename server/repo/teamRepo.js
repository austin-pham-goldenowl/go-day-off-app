var db = require('../fn/mysql-db');

exports.loadAll = () => {
  let sql = `select fId as ID, fTeamName as Team, fTeamLead as Leader from teams`;
  return db.load(sql);
}

exports.loadById = (teamId) => {
  let sql = `select fId as ID, fTeamName as Team, fTeamLead as Leader from teams where fId = ${teamId}`;
  return db.load(sql);
}

exports.deleteById = (teamId) => {
  let sql = `delete from teams where fId = ${teamId}`;
  return db.save(sql);
}

exports.add = (teamEntity, teamId) => {
  let sql = `insert into teams(fId, fTeamName, fTeamLead) value("${teamId}", "${teamEntity.name}", "${teamEntity.leader}")`;
  return db.save(sql);
}

exports.updateByID = (teamEntity, teamId) => {
  let sql = `update teams set fTeamName = "${teamEntity.name}", fTeamLead = "${teamEntity.leader}"`;
  return db.save(sql);
}