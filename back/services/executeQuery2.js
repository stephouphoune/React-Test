const mysql = require('mysql');
// Initialize pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'outil_activite',
  debug: true,
});

const executeQuery2 = (query) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (!connection) {
      reject(new Error('Unabled to connect to mysql database - error', err));
      return;
    }

    if (err) {
      connection.release();
      reject(err);
      return;
    }

    connection.query(query, (err, rows, fields) => {
      connection.release();
      if (!err) {
        return resolve(rows);
      }
      reject(err);
    });
    connection.on('error', err => {
      reject(err);
    });
  });
});

module.exports = executeQuery2;