var sha = require('crypto-js/sha256');
var uid = require('rand-token').uid;
var fs = require('fs');

var buff = '';
//Generate user id
buff += '================ [User ID - 10 characters] ================\n';
for (let i = 0; i < 3; i++){
  buff += `${uid(10)}|`;
}
buff = buff.slice(0, -1);

buff += '\n================ [Position ID- 5 characters] ================\n';
for (let i = 0; i < 15; i++){
  buff += `${uid(5)}|`;
}
buff = buff.slice(0, -1);

buff +='\n================ [Permission ID- 5 characters] ================\n';
for (let i = 0; i < 3; i++){
  buff += `${uid(5)}|`;
}
buff = buff.slice(0, -1);

buff += '\n================ [Team ID - 5 characters] ================\n';
for (let i = 0; i < 7; i++){
  buff += `${uid(5)}|`;
}
buff = buff.slice(0, -1);

buff += '\n================ [User Password - 64 characters] ================\n';
for (let i = 0; i < 3; i++){
  buff += `${sha("password")}|`;
}
buff = buff.slice(0, -1);

// Write file
fs.writeFile('./tokens.txt', buff, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('File was saved')
});