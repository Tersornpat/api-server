const mysql = require('mysql');

// Create MySQL connection Localhost
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'hospital_db-temp',
// });
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'c68c7ae898b3314ce258b9b4ad52d2321b435a18ba3a8116',
    database: 'hospital_db',
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Export the database connection
module.exports = db;
