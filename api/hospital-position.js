const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all positions
router.get('/', (req, res) => {
    db.query('SELECT * FROM Position', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve positions' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific position by ID
router.get('/:id', (req, res) => {
    const positionId = req.params.id;

    db.query(
        'SELECT * FROM Position WHERE Position_ID = ?',
        [positionId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve position' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Position not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new Position
router.post('/', (req, res) => {
    const { Position_ID, Position_Name } = req.body;

    console.log(Position_ID,Position_Name)

    db.query(
        'INSERT INTO Position (Position_ID, Position_Name) VALUES (?, ?);',
        [Position_ID, Position_Name],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create Position' });
            } else {
                res.status(201).json({ message: 'Department created successfully' });
            }
        }
    );
});

// Update a position
router.put('/:id', (req, res) => {
    const positionId = req.params.id;
    const { Position_Name } = req.body;

    db.query(
        'UPDATE Position SET Position_Name = ? WHERE Position_ID = ?',
        [Position_Name, positionId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update position' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Position not found' });
            } else {
                res.status(200).json({ message: 'Position updated successfully' });
            }
        }
    );
});

// Delete a position
router.delete('/:id', (req, res) => {
    const positionId = req.params.id;

    db.query(
        'DELETE FROM Position WHERE Position_ID = ?',
        [positionId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete position' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Position not found' });
            } else {
                res.status(200).json({ message: 'Position deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;