const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all List_ProSers
router.get('/list-prosers', (req, res) => {
    db.query('SELECT * FROM List_ProSer', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve List_ProSers' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific List_ProSer by ListProSer ID and Code
router.get('/:listProSerId/:code', (req, res) => {
    const listProSerId = req.params.listProSerId;
    const code = req.params.code;

    db.query(
        'SELECT * FROM List_ProSer WHERE ListProSer_ID = ? AND Code = ?',
        [listProSerId, code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve List_ProSer' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'List_ProSer not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new List_ProSer
router.post('/', (req, res) => {
    const { ListProSer_ID, total, amount, Code, ProSer_ID } = req.body;

    db.query(
        'INSERT INTO List_ProSer (ListProSer_ID, total, amount, Code, ProSer_ID) VALUES (?, ?, ?, ?, ?)',
        [ListProSer_ID, total, amount, Code, ProSer_ID],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create List_ProSer' });
            } else {
                res.status(201).json({ message: 'List_ProSer created successfully' });
            }
        }
    );
});

// Update a List_ProSer
router.put('/:listProSerId/:code', (req, res) => {
    const listProSerId = req.params.listProSerId;
    const code = req.params.code;
    const { total, amount, ProSer_ID } = req.body;

    db.query(
        'UPDATE List_ProSer SET total = ?, amount = ?, ProSer_ID = ? WHERE ListProSer_ID = ? AND Code = ?',
        [total, amount, ProSer_ID, listProSerId, code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update List_ProSer' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'List_ProSer not found' });
            } else {
                res.status(200).json({ message: 'List_ProSer updated successfully' });
            }
        }
    );
});

// Delete a List_ProSer
router.delete('/:listProSerId/:code', (req, res) => {
    const listProSerId = req.params.listProSerId;
    const code = req.params.code;

    db.query(
        'DELETE FROM List_ProSer WHERE ListProSer_ID = ? AND Code = ?',
        [listProSerId, code],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete List_ProSer' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'List_ProSer not found' });
            } else {
                res.status(200).json({ message: 'List_ProSer deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.end();
    process.exit();
});

module.exports = router;