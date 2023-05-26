const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all package_details
router.get('/', (req, res) => {
    db.query('SELECT * FROM package_detail', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve package_details' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific package_detail by package ID and ProSer ID
router.get('/:packageId/:proSerId', (req, res) => {
    const packageId = req.params.packageId;
    const proSerId = req.params.proSerId;

    db.query(
        'SELECT * FROM package_detail WHERE package_ID = ? AND ProSer_ID = ?',
        [packageId, proSerId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve package_detail' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'package_detail not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new package_detail
router.post('/', (req, res) => {
    const { package_ID, package_Name, ProSer_ID, beProSer_ID } = req.body;

    db.query(
        'INSERT INTO package_detail (package_ID, package_Name, ProSer_ID, beProSer_ID) VALUES (?, ?, ?, ?)',
        [package_ID, package_Name, ProSer_ID, beProSer_ID],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create package_detail' });
            } else {
                res.status(201).json({ message: 'package_detail created successfully' });
            }
        }
    );
});

// Update a package_detail
router.put('/:packageId/:proSerId', (req, res) => {
    const packageId = req.params.packageId;
    const proSerId = req.params.proSerId;
    const { package_Name, beProSer_ID } = req.body;

    db.query(
        'UPDATE package_detail SET package_Name = ?, beProSer_ID = ? WHERE package_ID = ? AND ProSer_ID = ?',
        [package_Name, beProSer_ID, packageId, proSerId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update package_detail' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'package_detail not found' });
            } else {
                res.status(200).json({ message: 'package_detail updated successfully' });
            }
        }
    );
});

// Delete a package_detail
router.delete('/:packageId/:proSerId', (req, res) => {
    const packageId = req.params.packageId;
    const proSerId = req.params.proSerId;

    db.query(
        'DELETE FROM package_detail WHERE package_ID = ? AND ProSer_ID = ?',
        [packageId, proSerId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete package_detail' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'package_detail not found' });
            } else {
                res.status(200).json({ message: 'package_detail deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;