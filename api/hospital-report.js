const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all reports
router.get('/', (req, res) => {
    db.query('SELECT * FROM Report', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve reports' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific report by ID
router.get('/:id', (req, res) => {
    const reportId = req.params.id;

    db.query(
        'SELECT Report.Report_ID,Report.Report_Date,Report.weight,Report.height,Report.Pressure,Report.BPM,Report.Temp,Employee.*,Patient.* FROM Report INNER JOIN Employee ON Report.Employee_ID = Employee.Employee_ID INNER JOIN Patient ON Report.Patient_ID = Patient.Patient_ID WHERE Report_ID = ?',
        [reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve report' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Report not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new report
router.post('/', (req, res) => {
    const { Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp } = req.body;

    db.query(
        'INSERT INTO Report (Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp],
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to create report' });
            } else {
                res.status(201).json({ message: 'Report created successfully' });
            }
        }
    );
});

// Update a report
router.put('/:id', (req, res) => {
    const reportId = req.params.id;
    const { Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp } = req.body;

    db.query(
        'UPDATE Report SET Patient_ID = ?, Employee_ID = ?, Report_Date = ?, weight = ?, height = ?, Pressure = ?, BPM = ?, Temp = ? WHERE Report_ID = ?',
        [Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update report' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report not found' });
            } else {
                res.status(200).json({ message: 'Report updated successfully' });
            }
        }
    );
});

// Delete a report
router.delete('/:id', (req, res) => {
    const reportId = req.params.id;

    db.query(
        'DELETE FROM Report WHERE Report_ID = ?',
        [reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete report' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report not found' });
            } else {
                res.status(200).json({ message: 'Report deleted successfully' });
            }
        }
    );
});

module.exports = router;
