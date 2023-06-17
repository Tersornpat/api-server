const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all Appointments
router.get('/', (req, res) => {
    db.query('SELECT * FROM Appoint', (error, results) => {
        if (error) {
            
            res.status(500).json({ error: 'Failed to retrieve Appointments' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific Appointment by ID
router.get('/:id', (req, res) => {
    const appointmentId = req.params.id;

    db.query(
        'SELECT * FROM Appoint WHERE Appoint_ID = ?',
        [appointmentId],
        (error, results) => {
            if (error) {
                
                res.status(500).json({ error: 'Failed to retrieve Appointment' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Appointment not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new Appointment
router.post('/', (req, res) => {
    const { Employee_ID, Patient_ID, Report_ID } = req.body;

    db.query(
        'INSERT INTO Appoint (Employee_ID, Patient_ID, Report_ID) VALUES (?, ?, ?);',
        [parseInt(Employee_ID), parseInt(Patient_ID), parseInt(Report_ID)],
        (error, results) => {
            if (error) {
                ;
                res.status(500).json({ error: 'Failed to create Appointment' });
            } else {
                res.status(201).json({ message: 'Appointment created successfully' });
            }
        }
    );
});

// Update an Appointment
router.put('/:id', (req, res) => {
    const appointmentId = req.params.id;
    const { Employee_ID, Patient_ID, Report_ID } = req.body;

    db.query(
        'UPDATE Appoint SET Employee_ID = ?, Patient_ID = ?, Report_ID = ? WHERE Appoint_ID = ?',
        [Employee_ID, Patient_ID, Report_ID, appointmentId],
        (error, results) => {
            if (error) {
                
                res.status(500).json({ error: 'Failed to update Appointment' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Appointment not found' });
            } else {
                res.status(200).json({ message: 'Appointment updated successfully' });
            }
        }
    );
});

// Delete an Appointment
router.delete('/:id', (req, res) => {
    const appointmentId = req.params.id;

    db.query(
        'DELETE FROM Appoint WHERE Appoint_ID = ?',
        [appointmentId],
        (error, results) => {
            if (error) {
                
                res.status(500).json({ error: 'Failed to delete Appointment' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Appointment not found' });
            } else {
                res.status(200).json({ message: 'Appointment deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;
