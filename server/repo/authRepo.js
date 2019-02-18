var sha256 = require('crypto-js/sha256');
var moment = require('moment');

var db = require('../fn/mysql-db');

exports.addAccount = (userEntity, id) => {
  let encPwd = sha256(userEntity.password);
  let sql = `
    insert into users(fId, fFirstName, fLastName, fBday, fPosition, fAddress, fPhone, fTeamId, fTypeId, fEmail, fPassword, fUsername)
    values ('${id}', '${userEntity.firstName}', '${userEntity.lastName}', '${userEntity.bDay}', '${userEntity.posId}', 
    '${userEntity.address}', '${userEntity.phoneNum}', '${userEntity.teamId}', '${userEntity.typeId}', '${userEntity.email}', 
    '${encPwd}', '${userEntity.userName}')`;

  return db.save(sql);
}

exports.login = (loginEntity) => {
  console.log('Login Entity: ',loginEntity);
  let encPwd = sha256(loginEntity.password);
  console.log('Encrypted password: ' + encPwd);
  let sql = `select * from users where fUsername = '${loginEntity.userName}' and fPassword = '${encPwd}'`;
  return db.load(sql);
}