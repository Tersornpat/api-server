const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all inspection details
router.get('/inspection-details', (req, res) => {
    db.query('SELECT * FROM Inspection_detail', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve inspection details' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific inspection detail by Inspection ID and ProSer ID
router.get('/inspection-details/:inspectionId/:proserId', (req, res) => {
    const inspectionId = req.params.inspectionId;
    const proserId = req.params.proserId;

    db.query(
        'SELECT * FROM Inspection_detail WHERE Inspection_ID = ? AND ProSer_ID = ?',
        [inspectionId, proserId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve inspection detail' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Inspection detail not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new inspection detail
router.post('/', (req, res) => {
    const { Inspection_Name, Inspection_ID, ProSer_ID, Code } = req.body;

    db.query(
        'INSERT INTO Inspection_detail (Inspection_Name, Inspection_ID, ProSer_ID, Code) VALUES (?, ?, ?, ?)',
        [Inspection_Name, Inspection_ID, ProSer_ID, Code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create inspection detail' });
            } else {
                res.status(201).json({ message: 'Inspection detail created successfully' });
            }
        }
    );
});

// Update an inspection detail
router.put('/:inspectionId/:proserId', (req, res) => {
    const inspectionId = req.params.inspectionId;
    const proserId = req.params.proserId;
    const { Inspection_Name, Code } = req.body;

    db.query(
        'UPDATE Inspection_detail SET Inspection_Name = ?, Code = ? WHERE Inspection_ID = ? AND ProSer_ID = ?',
        [Inspection_Name, Code, inspectionId, proserId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update inspection detail' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Inspection detail not found' });
            } else {
                res.status(200).json({ message: 'Inspection detail updated successfully' });
            }
        }
    );
});

// Delete an inspection detail
router.delete('/:inspectionId/:proserId', (req, res) => {
    const inspectionId = req.params.inspectionId;
    const proserId = req.params.proserId;

    db.query(
        'DELETE FROM Inspection_detail WHERE Inspection_ID = ? AND ProSer_ID = ?',
        [inspectionId, proserId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete inspection detail' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Inspection detail not found' });
            } else {
                res.status(200).json({ message: 'Inspection detail deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.end();
    process.exit();
});

module.exports = router;