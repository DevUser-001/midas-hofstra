var mysql = require('mysql2');

const connection = mysql.createPool({
  host: '62.72.50.23',
  user: 'u619697559_midas_devuser',
  password: 'Devuser123#',
  database: 'u619697559_midas_hofsra'
}).promise();

module.exports = connection;