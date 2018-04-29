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

const executeQuery = (query, callback) => {
    pool.getConnection((err, connection) => {
        if (!connection)
        {
            throw new Error('Unabled to connect to mysql database - error', err);
            return;
        }
        
        if (err) {
            connection.release();
            throw err;
        }
    
        connection.query(query, (err, rows, fields) => {
            connection.release();
            if (!err) {
                callback(null, rows );
            }       
        });
        connection.on('error', err => {
            throw err;
        });
    });
}

module.exports = executeQuery;