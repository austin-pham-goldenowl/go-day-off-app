var moment = require('moment');
var db = require('../fn/mysql-db');

let standardizeKeys = (key) => {
  if (key.length < 1) return '';
  return 'f' + key.charAt(0).toLocaleUpperCase() + key.slice(1);
}

exports.loadAll = () => {
  let sql = `SELECT * FROM users`;
  return db.load(sql);
}

exports.load = (userId) => {
  let sql = `SELECT * FROM users WHERE fId = "${userId}"`;
  return db.load(sql);
}

exports.update = (userEntity, id) => {
  let keys = Object.keys(userEntity);
  console.log(`userRepo -> \'update\' -> keys in userEntity: `, keys); //DEBUG
  let numKeys = keys.length;
  console.log(`userRepo -> \'update\' -> numKeys in userEntity: `, numKeys); //DEBUG

  // First init sql script
  let sql = `UPDATE users SET `;
  console.log(`userRepo -> \'update\' -> sql init: `, sql); //DEBUG

  // Handling the first {key: value}

  sql += `${standardizeKeys(keys[0])} = "${userEntity[keys[0]]}"`;
  console.log(`userRepo -> \'update\' -> sql after first: `, sql); //DEBUG

  // Handling the rest {key: value}
  for (let i = 1; i < numKeys; i++) {
    sql += `, ${standardizeKeys(keys[i])} = "${userEntity[keys[i]]}"`;
  }

  sql += ` WHERE fId = "${id}"`;
  console.log(`update sql script: `, sql);
  return db.save(sql);
}
/**
 * 
{
	"firstName": "Quoc Cuong",
	"lastName" : "Nguyen",
	"bday"     : "1999-10-20 12:12:12",
	"posId"    : "hGKx5",
	"address"  : "40E Ngo Duc Ke street, Ben Nghe ward, Dist. 1, HCMC",
	"phoneNum" : "0123456789",
	"teamId"   : "",
	"typeId"   : "",
	"email"    : "abc@go.com",
	"password" : "sayohyeah",
	"username" : "abc"
}
 */

 /**
{ fId: 'n1UCVxhBOy',
     fFirstName: 'Quoc Cuong',
     fLastName: 'Nguyen',
     fBday: '1999-10-20T05:12:12.000Z',
     fPosition: 'hGKx5',
     fAddress: '40E Ngo Duc Ke street, Ben Nghe ward, Dist. 1, HCMC',
     fPhone: '0123456789',
     fTeamId: '',
     fTypeId: '',
     fEmail: 'abc@go.com',
     fPassword:
      '2cdefdcd003aab6fc17f8b0ff4113cc8ce31f33256afd6b99bc87cf3b162d454',
     fUsername: 'abc',
     positions_fId: null,
     userPermission_fId: null,
     teams_fId: null },
  */