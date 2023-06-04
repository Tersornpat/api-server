const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all report details
router.get('/', (req, res) => {
    db.query('SELECT * FROM Reportdetail', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve report details' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve specific report details by Report_ID
router.get('/:id', (req, res) => {
    const reportId = req.params.id;

    db.query(
        'SELECT * FROM Reportdetail WHERE Report_ID = ?',
        [reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve report details' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Report details not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create new report details
router.post('/', (req, res) => {
    const { Report_ID, weight, height, Pressure, BPM, Temp } = req.body;

    db.query(
        'INSERT INTO Reportdetail (Report_ID, weight, height, Pressure, BPM, Temp) VALUES (?, ?, ?, ?, ?, ?)',
        [Report_ID, weight, height, Pressure, BPM, Temp],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create report details' });
            } else {
                res.status(201).json({ message: 'Report details created successfully' });
            }
        }
    );
});

// Update report details
router.put('/:id', (req, res) => {
    const reportId = req.params.id;
    const { weight, height, Pressure, BPM, Temp } = req.body;

    db.query(
        'UPDATE Reportdetail SET weight = ?, height = ?, Pressure = ?, BPM = ?, Temp = ? WHERE Report_ID = ?',
        [weight, height, Pressure, BPM, Temp, reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update report details' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report details not found' });
            } else {
                res.status(200).json({ message: 'Report details updated successfully' });
            }
        }
    );
});

// Delete report details
router.delete('/:id', (req, res) => {
    const reportId = req.params.id;

    db.query(
        'DELETE FROM Reportdetail WHERE Report_ID = ?',
        [reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete report details' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report details not found' });
            } else {
                res.status(200).json({ message: 'Report details deleted successfully' });
            }
        }
    );
});

module.exports = router;
