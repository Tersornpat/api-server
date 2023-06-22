const mysql = require('mysql');

// Create MySQL connection Localhost
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'hospital_db-temp',
// });
const db = mysql.createConnection({
    host: 'database-kmitl-hospital.cn6cwktodrpj.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin1234',
    database: 'hospital_db',
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Export the database connection
module.exports = db;
