var moment = require('moment');
var uid = require('rand-token').uid;

console.log('========= DATE TIME moment ============');
let rdt = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(rdt);

console.log('============= ShortId (10 chars) ==============');
for (let i = 0; i < 5; i++) {
  console.log(uid(10));
}