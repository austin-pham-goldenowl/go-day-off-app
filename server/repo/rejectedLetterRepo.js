var db = require('../fn/mysql-db');

exports.loadAll = () => {
  let sql = `select fLetterId as LetterID, fReason as Reason, fRejectType as RejectType from rejectedLetterDetail`;
  return db.load(sql);
}

exports.loadByLetterId = (letterId) => {
  let sql = `select fLetterId as LetterID, fReason as Reason, fRejectType as RejectType from rejectedLetterDetail where fLetterId = "${letterId}"`;
  return db.load(sql);
}

exports.add = (letterId, rejectDetail) => {
  let sql = `insert into rejectedLetterDetail(fLetterId, fReason, fRejectType) value ("${letterId}","${rejectDetail.reason}","${rejectDetail.rejectType}")`;
  return db.save(sql);
}

exports.updateReason = (letterId, reason) => {
  let sql = `update rejectedLetterDetail set fReason = "${reason}" where fLetterId = "${letterId}"`;
  return db.save(sql);
}

exports.updateType = (letterId, type) => {
  let sql = `update rejectedLetterDetail set fRejectType = ${type} where fLetterId = "${letterId}"`;
  return db.save(sql);
}

exports.removeById = (letterId) => {
  let sql = `delete from rejectedLetterDetail where fLetterId = "${letterId}"`;
  return db.save(sql);
}