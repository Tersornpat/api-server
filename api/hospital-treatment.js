const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all Treatments
router.get('/', (req, res) => {
    db.query('SELECT * FROM Treatment', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve Treatments' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific Treatment by Treatment ID and Lab ID
router.get('/:treatmentId/:labId', (req, res) => {
    const treatmentId = req.params.treatmentId;
    const labId = req.params.labId;

    db.query(
        'SELECT * FROM Treatment WHERE Treatment_ID = ? AND Lab_ID = ?',
        [treatmentId, labId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve Treatment' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Treatment not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new Treatment
router.post('/', (req, res) => {
    const { Treatment_INFO, Treatment_DATE, Treatment_ID, Lab_ID, Code } = req.body;

    db.query(
        'INSERT INTO Treatment (Treatment_INFO, Treatment_DATE, Treatment_ID, Lab_ID, Code) VALUES (?, ?, ?, ?, ?)',
        [Treatment_INFO, Treatment_DATE, Treatment_ID, Lab_ID, Code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create Treatment' });
            } else {
                res.status(201).json({ message: 'Treatment created successfully' });
            }
        }
    );
});

// Update a Treatment
router.put('/:treatmentId/:labId', (req, res) => {
    const treatmentId = req.params.treatmentId;
    const labId = req.params.labId;
    const { Treatment_INFO, Treatment_DATE, Code } = req.body;

    db.query(
        'UPDATE Treatment SET Treatment_INFO = ?, Treatment_DATE = ?, Code = ? WHERE Treatment_ID = ? AND Lab_ID = ?',
        [Treatment_INFO, Treatment_DATE, Code, treatmentId, labId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update Treatment' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Treatment not found' });
            } else {
                res.status(200).json({ message: 'Treatment updated successfully' });
            }
        }
    );
});

// Delete a Treatment
router.delete('/:treatmentId/:labId', (req, res) => {
    const treatmentId = req.params.treatmentId;
    const labId = req.params.labId;

    db.query(
        'DELETE FROM Treatment WHERE Treatment_ID = ? AND Lab_ID = ?',
        [treatmentId, labId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete Treatment' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Treatment not found' });
            } else {
                res.status(200).json({ message: 'Treatment deleted successfully' });
            }
        }
    );
});


process.on('SIGINT', () => {
    db.end();
    process.exit();
});

module.exports = router;