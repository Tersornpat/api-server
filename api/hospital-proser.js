const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all ProSers
router.get('/prosers', (req, res) => {
    db.query('SELECT * FROM ProSer', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve ProSers' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific ProSer by ID
router.get('/prosers/:id', (req, res) => {
    const proserId = req.params.id;

    db.query(
        'SELECT * FROM ProSer WHERE ProSer_ID = ?',
        [proserId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve ProSer' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'ProSer not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new ProSer
router.post('/prosers', (req, res) => {
    const { ProSer_ID, ProSer_Name, ProSer_SROCK, ProSer_PRICE, ProSer_Detail, ProSer_Effects, Patterns_ID } = req.body;

    db.query(
        'INSERT INTO ProSer (ProSer_ID, ProSer_Name, ProSer_SROCK, ProSer_PRICE, ProSer_Detail, ProSer_Effects, Patterns_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [ProSer_ID, ProSer_Name, ProSer_SROCK, ProSer_PRICE, ProSer_Detail, ProSer_Effects, Patterns_ID],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create ProSer' });
            } else {
                res.status(201).json({ message: 'ProSer created successfully' });
            }
        }
    );
});

// Update a ProSer
router.put('/prosers/:id', (req, res) => {
    const proserId = req.params.id;
    const { ProSer_Name, ProSer_SROCK, ProSer_PRICE, ProSer_Detail, ProSer_Effects, Patterns_ID } = req.body;

    db.query(
        'UPDATE ProSer SET ProSer_Name = ?, ProSer_SROCK = ?, ProSer_PRICE = ?, ProSer_Detail = ?, ProSer_Effects = ?, Patterns_ID = ? WHERE ProSer_ID = ?',
        [ProSer_Name, ProSer_SROCK, ProSer_PRICE, ProSer_Detail, ProSer_Effects, Patterns_ID, proserId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update ProSer' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'ProSer not found' });
            } else {
                res.status(200).json({ message: 'ProSer updated successfully' });
            }
        }
    );
});

// Delete a ProSer
router.delete('/prosers/:id', (req, res) => {
    const proserId = req.params.id;

    db.query(
        'DELETE FROM ProSer WHERE ProSer_ID = ?',
        [proserId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete ProSer' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'ProSer not found' });
            } else {
                res.status(200).json({ message: 'ProSer deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.end();
    process.exit();
});

module.exports = router;