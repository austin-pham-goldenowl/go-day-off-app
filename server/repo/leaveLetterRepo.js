var db = require('../fn/mysql-db');

exports.loadAll = () => {
  let sql = `select fId as ID, fRdt as CreateDT, fUserId as UserID, fStatus as Status,
    fFromDT as FromDT, fToDT as ToDT, fAbsenceType as AbsenceTypeID, fSubstituteId as SubstituteID from leaveLetters`;
  return db.load(sql);
}

exports.loadById = (letterId) => {
  let sql = `select fId as ID, fRdt as CreateDT, fUserId as UserID, fStatus as Status,
    fFromDT as FromDT, fToDT as ToDT, fAbsenceType as AbsenceTypeID, fSubstituteId as SubstituteID from leaveLetters where fId = "${letterId}"`;
  return db.load(sql);
}

exports.deleteById = (letterId) => {
  let sql = `delete from leaveLetters where fId = "${letterId}"`;
  return db.save(sql);
}

exports.add = (letterEntity, id) => {
  let sql = `insert into leaveLetters(fId, fRdt, fUserId, fStatus, fFromDT, fToDT, fAbsenceType, fSubstituteId)
   value("${id}","${letterEntity.rdt}","${letterEntity.userId}","${letterEntity.status}","${letterEntity.fromDT}",
   "${letterEntity.toDT}","${letterEntity.absenceType}","${letterEntity.substituteId}")`;
  return db.save(sql);
}

exports.updateStatus = (letterStatus, letterId) => {
  let sql = `update leaveLetters set fStatus = "${letterStatus}" where fId = "${letterId}"`;
  return db.save(sql);
}

