const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all main actions
router.get('/', (req, res) => {
    db.query('SELECT * FROM Main_action', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve main actions' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific main action by code
router.get('/:code', (req, res) => {
    const code = req.params.code;

    db.query(
        'SELECT * FROM Main_action WHERE Code = ?',
        [code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve main action' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Main action not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new main action
router.post('/', (req, res) => {
    const { discount, Code, date, vat, total, Employee_ID, dispenseEmployee_ID, financeEmployee_ID, Patient_ID } = req.body;

    db.query(
        'INSERT INTO Main_action (discount, Code, date, vat, total, Employee_ID, dispenseEmployee_ID, financeEmployee_ID, Patient_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [discount, Code, date, vat, total, Employee_ID, dispenseEmployee_ID, financeEmployee_ID, Patient_ID],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create main action' });
            } else {
                res.status(201).json({ message: 'Main action created successfully' });
            }
        }
    );
});

// Update a main action
router.put('/:code', (req, res) => {
    const code = req.params.code;
    const { discount, date, vat, total, Employee_ID, dispenseEmployee_ID, financeEmployee_ID, Patient_ID } = req.body;

    db.query(
        'UPDATE Main_action SET discount = ?, date = ?, vat = ?, total = ?, Employee_ID = ?, dispenseEmployee_ID = ?, financeEmployee_ID = ?, Patient_ID = ? WHERE Code = ?',
        [discount, date, vat, total, Employee_ID, dispenseEmployee_ID, financeEmployee_ID, Patient_ID, code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update main action' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Main action not found' });
            } else {
                res.status(200).json({ message: 'Main action updated successfully' });
            }
        }
    );
});

// Delete a main action
router.delete('/:code', (req, res) => {
    const code = req.params.code;

    db.query(
        'DELETE FROM Main_action WHERE Code = ?',
        [code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete main action' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Main action not found' });
            } else {
                res.status(200).json({ message: 'Main action deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;