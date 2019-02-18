var mysql = require('mysql');
const serverInfo = require('./constants').serverInfo;

var createConnection = () => {
  return mysql.createConnection({
    host: serverInfo.SERVER_HOST_ADDRESS,
    port: serverInfo.SERVER_HOST_PORT,
    user: serverInfo.SERVER_HOST_USER,
    password: serverInfo.SERVER_HOST_PWD,
    database: serverInfo.SERVER_HOST_DB_NAME
  });
};

exports.load = sql => {
  return new Promise((resolve, reject) => {
    var cn = createConnection();
    cn.connect((err) => {
      if (err) {
        console.log('[SERVER_LOG] -> ERROR Can\'t connect: ' + err.stack);
        return;
      }
      console.log('[SERVER_LOG] -> SUCCESS Connected as id: ' + cn.threadId);
    });

    cn.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(rows)
      }
      cn.end();
    });
  });
}

exports.save = sql => {
  return new Promise((resolve, reject) => {
    var cn = createConnection();
    cn.connect((err) => {
      if (err) {
        console.log('[SERVER_LOG] -> ERROR Can\'t connect: ' + err.stack);
        return;
      }
      console.log('[SERVER_LOG] -> SUCCESS Connected as id: ' + cn.threadId);
    });
    cn.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows)
      }
      cn.end();
    });
  });
};