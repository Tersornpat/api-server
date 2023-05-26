const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all N_Labs
router.get('/', (req, res) => {
    db.query('SELECT * FROM N_Lab', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve N_Labs' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific N_Lab by Lab ID
router.get('/:id', (req, res) => {
    const labId = req.params.id;

    db.query(
        'SELECT * FROM N_Lab WHERE Lab_ID = ?',
        [labId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve N_Lab' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'N_Lab not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new N_Lab
router.post('/', (req, res) => {
    const { Lab_Name, Lab_ID, Code } = req.body;

    db.query(
        'INSERT INTO N_Lab (Lab_Name, Lab_ID, Code) VALUES (?, ?, ?)',
        [Lab_Name, Lab_ID, Code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create N_Lab' });
            } else {
                res.status(201).json({ message: 'N_Lab created successfully' });
            }
        }
    );
});

// Update an N_Lab
router.put('/:id', (req, res) => {
    const labId = req.params.id;
    const { Lab_Name, Code } = req.body;

    db.query(
        'UPDATE N_Lab SET Lab_Name = ?, Code = ? WHERE Lab_ID = ?',
        [Lab_Name, Code, labId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update N_Lab' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'N_Lab not found' });
            } else {
                res.status(200).json({ message: 'N_Lab updated successfully' });
            }
        }
    );
});

// Delete an N_Lab
router.delete('/:id', (req, res) => {
    const labId = req.params.id;

    db.query(
        'DELETE FROM N_Lab WHERE Lab_ID = ?',
        [labId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete N_Lab' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'N_Lab not found' });
            } else {
                res.status(200).json({ message: 'N_Lab deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;