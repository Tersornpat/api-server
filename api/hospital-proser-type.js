const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all ProSer types
router.get('/', (req, res) => {
    db.query('SELECT * FROM ProSer_Type', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve ProSer types' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific ProSer type by ID
router.get('/:id', (req, res) => {
    const typeId = req.params.id;

    db.query(
        'SELECT * FROM ProSer_Type WHERE Patterns_ID = ?',
        [typeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve ProSer type' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'ProSer type not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new ProSer type
router.post('/', (req, res) => {
    const { Patterns_ID, Pattern_Name } = req.body;

    db.query(
        'INSERT INTO ProSer_Type (Patterns_ID, Pattern_Name) VALUES (?, ?)',
        [Patterns_ID, Pattern_Name],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create ProSer type' });
            } else {
                res.status(201).json({ message: 'ProSer type created successfully' });
            }
        }
    );
});

// Update a ProSer type
router.put('/:id', (req, res) => {
    const typeId = req.params.id;
    const { Pattern_Name } = req.body;

    db.query(
        'UPDATE ProSer_Type SET Pattern_Name = ? WHERE Patterns_ID = ?',
        [Pattern_Name, typeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update ProSer type' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'ProSer type not found' });
            } else {
                res.status(200).json({ message: 'ProSer type updated successfully' });
            }
        }
    );
});

// Delete a ProSer type
router.delete('/:id', (req, res) => {
    const typeId = req.params.id;

    db.query(
        'DELETE FROM ProSer_Type WHERE Patterns_ID = ?',
        [typeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete ProSer type' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'ProSer type not found' });
            } else {
                res.status(200).json({ message: 'ProSer type deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;