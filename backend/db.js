const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jmdbittu',
    database: 'node_ws'
});

// tests if the connection is made or not
connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to database : ${err}`);
        return;
    }
    console.log('Connected to database');
});

module.exports = { connection };