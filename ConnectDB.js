const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Porapipat',
    password: 'Porapipat159753654',
    database: 'hospital_db',
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Export the database connection
module.exports = db;
