const mysql=require('mysql2');

const pool =mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'productos_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const poolPromise=pool.promise();
const getConnection=()=>poolPromise;

module.exports={getConnection};