const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM Myuser', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve users' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific user by username
router.get('/:username', (req, res) => {
    const username = req.params.username;

    db.query(
        'SELECT * FROM Myuser WHERE Myuser_Username = ?',
        [username],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve user' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Retrieve a Bcrypt hashed password by username
router.get('/gethashed/:username', (req, res) => {
    const username = req.params.username;

    db.query(
        'SELECT Myuser_Password FROM Myuser WHERE Myuser_Username = ?',
        [username],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve user' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new user
router.post('/', (req, res) => {
    const { Employee_ID, Myuser_Username, Myuser_Password, Myuser_Role } = req.body;

    db.query(
        'INSERT INTO Myuser (Employee_ID, Myuser_Username, Myuser_Password, Myuser_Role) VALUES (?, ?, ?, ?)',
        [Employee_ID, Myuser_Username, Myuser_Password, Myuser_Role],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create user' });
            } else {
                res.status(201).json({ message: 'User created successfully' });
            }
        }
    );
});

// Update a user
router.put('/:username', (req, res) => {
    const username = req.params.username;
    const { Myuser_Username, Myuser_Password, Myuser_Role } = req.body;

    db.query(
        'UPDATE Myuser SET Myuser_Username = ?, Myuser_Password = ?, Myuser_Role = ? WHERE Myuser_Username = ?',
        [Myuser_Username, Myuser_Password, Myuser_Role, username],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update user' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json({ message: 'User updated successfully' });
            }
        }
    );
});

// Delete a user
router.delete('/:username', (req, res) => {
    const username = req.params.username;

    db.query(
        'DELETE FROM Myuser WHERE Myuser_Username = ?',
        [username],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete user' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.end();
    process.exit();
});

module.exports = router;