const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all patients
router.get('/', (req, res) => {
    db.query('SELECT * FROM Patient', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve patients' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific patient by ID
router.get('/:id', (req, res) => {
    const patientId = req.params.id;

    db.query(
        'SELECT * FROM Patient WHERE Patient_ID = ?',
        [patientId],
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to retrieve patient' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Patient not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Retrieve a specific patient by ID
router.get('/getwithempinfo/:id', (req, res) => {
    const patientId = req.params.id;

    db.query(
        'Select Patient.Patient_Sex, Patient.Patient_Tel1, Patient.Patient_Tel2, Patient.Patient_Address, Patient.Patient_ID, Patient.Patient_NRelative, Patient.Patient_name, Patient.Patient_lname, Patient.Patient_BD, Patient.Patient_Allergic, Patient.Patient_Disease, Patient.Patient_TelRelative, Patient.Patient_SignDate, Employee.Employee_ID ,Employee.Employee_name, Employee.Employee_Lname, Employee.Employee_sex, Employee.Employee_tel1, Employee.Employee_tel2, Employee.Employee_SP, Employee.Position_ID, Employee.Department_ID from Patient, Employee WHERE Patient.Patient_ID = ? AND Patient.Employee_ID = Employee.Employee_ID;',
        [patientId],
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to retrieve patient' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Patient not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Create a new patient
router.post('/', (req, res) => {
    const {
        Patient_Sex,
        Patient_Tel1,
        Patient_Tel2,
        Patient_Address,
        Patient_ID,
        Patient_NRelative,
        Patient_name,
        Patient_lname,
        Patient_BD,
        Patient_Allergic,
        Patient_Disease,
        Patient_TelRelative,
        Patient_SignDate,
        Employee_ID
    } = req.body;

    db.query(
        'INSERT INTO Patient (Patient_Sex, Patient_Tel1, Patient_Tel2, Patient_Address, Patient_ID, Patient_NRelative, Patient_name, Patient_lname, Patient_BD, Patient_Allergic, Patient_Disease, Patient_TelRelative, Patient_SignDate, Employee_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            Patient_Sex,
            Patient_Tel1,
            Patient_Tel2,
            Patient_Address,
            Patient_ID,
            Patient_NRelative,
            Patient_name,
            Patient_lname,
            Patient_BD,
            Patient_Allergic,
            Patient_Disease,
            Patient_TelRelative,
            Patient_SignDate,
            Employee_ID
        ],
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to create patient' });
            } else {
                res.status(201).json({ message: 'Patient created successfully' });
            }
        }
    );
});

// Update a patient
router.put('/:id', (req, res) => {
    const patientId = req.params.id;
    const {
        Patient_Sex,
        Patient_Tel1,
        Patient_Tel2,
        Patient_Address,
        Patient_NRelative,
        Patient_name,
        Patient_lname,
        Patient_BD,
        Patient_Allergic,
        Patient_Disease,
        Patient_TelRelative,
        Patient_SignDate,
        Employee_ID
    } = req.body;

    db.query(
        'UPDATE Patient SET Patient_Sex = ?, Patient_Tel1 = ?, Patient_Tel2 = ?, Patient_Address = ?, Patient_NRelative = ?, Patient_name = ?, Patient_lname = ?, Patient_BD = ?, Patient_Allergic = ?, Patient_Disease = ?, Patient_TelRelative = ?, Patient_SignDate = ?, Employee_ID = ? WHERE Patient_ID = ?',
        [
            Patient_Sex,
            Patient_Tel1,
            Patient_Tel2,
            Patient_Address,
            Patient_NRelative,
            Patient_name,
            Patient_lname,
            Patient_BD,
            Patient_Allergic,
            Patient_Disease,
            Patient_TelRelative,
            Patient_SignDate,
            Employee_ID,
            patientId
        ],
        (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to update patient' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Patient not found' });
            } else {
                res.status(200).json({ message: 'Patient updated successfully' });
            }
        }
    );
});

// Delete a patient
router.delete('/:id', (req, res) => {
    const patientId = req.params.id;

    db.query(
        'DELETE FROM Patient WHERE Patient_ID = ?',
        [patientId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete patient' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Patient not found' });
            } else {
                res.status(200).json({ message: 'Patient deleted successfully' });
            }
        }
    );
});


process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;