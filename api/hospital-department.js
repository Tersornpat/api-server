const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all departments
router.get('/', (req, res) => {
    db.query('SELECT * FROM Department', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve departments' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific department by ID
router.get('/:id', (req, res) => {
    const departmentId = req.params.id;

    db.query(
        'SELECT * FROM Department WHERE Department_ID = ?',
        [departmentId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve department' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Department not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new department
router.post('/', (req, res) => {
    const { Department_ID, Department_Name } = req.body;

    db.query(
        'INSERT INTO Department (Department_ID, Department_Name) VALUES (?, ?)',
        [Department_ID, Department_Name],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create department' });
            } else {
                res.status(201).json({ message: 'Department created successfully' });
            }
        }
    );
});

// Update a department
router.put('/:id', (req, res) => {
    const departmentId = req.params.id;
    const { Department_Name } = req.body;

    db.query(
        'UPDATE Department SET Department_Name = ? WHERE Department_ID = ?',
        [Department_Name, departmentId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update department' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Department not found' });
            } else {
                res.status(200).json({ message: 'Department updated successfully' });
            }
        }
    );
});

// Delete a department
router.delete('/:id', (req, res) => {
    const departmentId = req.params.id;

    db.query(
        'DELETE FROM Department WHERE Department_ID = ?',
        [departmentId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete department' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Department not found' });
            } else {
                res.status(200).json({ message: 'Department deleted successfully' });
            }
        }
    );
});



process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;