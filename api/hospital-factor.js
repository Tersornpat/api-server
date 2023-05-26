const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all factors
router.get('/', (req, res) => {
    db.query('SELECT * FROM Factor', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve factors' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific factor by code
router.get('/:code', (req, res) => {
    const code = req.params.code;

    db.query(
        'SELECT * FROM Factor WHERE Code = ?',
        [code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve factor' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Factor not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new factor
router.post('/', (req, res) => {
    const { Code, Name, Unit_Detail, Min_Unit, Max_Unit } = req.body;

    db.query(
        'INSERT INTO Factor (Code, Name, Unit_Detail, Min_Unit, Max_Unit) VALUES (?, ?, ?, ?, ?)',
        [Code, Name, Unit_Detail, Min_Unit, Max_Unit],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create factor' });
            } else {
                res.status(201).json({ message: 'Factor created successfully' });
            }
        }
    );
});

// Update a factor
router.put('/:code', (req, res) => {
    const code = req.params.code;
    const { Name, Unit_Detail, Min_Unit, Max_Unit } = req.body;

    db.query(
        'UPDATE Factor SET Name = ?, Unit_Detail = ?, Min_Unit = ?, Max_Unit = ? WHERE Code = ?',
        [Name, Unit_Detail, Min_Unit, Max_Unit, code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update factor' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Factor not found' });
            } else {
                res.status(200).json({ message: 'Factor updated successfully' });
            }
        }
    );
});

// Delete a factor
router.delete('/:code', (req, res) => {
    const code = req.params.code;

    db.query(
        'DELETE FROM Factor WHERE Code = ?',
        [code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete factor' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Factor not found' });
            } else {
                res.status(200).json({ message: 'Factor deleted successfully' });
            }
        }
    );
});


process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;