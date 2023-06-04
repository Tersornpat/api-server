const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

// Retrieve all employees
router.get('/', (req, res) => {
    db.query('SELECT * FROM Employee', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve employees' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Retrieve a specific employee by ID
router.get('/:id', (req, res) => {
    const employeeId = req.params.id;

    db.query(
        'SELECT * FROM Employee WHERE Employee_ID = ?',
        [employeeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve employee' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Retrieve a specific employee with join position and department by ID
router.get('/:id', (req, res) => {
    const employeeId = req.params.id;

    db.query(
        'SELECT Employee.*, Position.Position_Name, Department.Department_name From Employee INNER JOIN Position on Employee.Position_ID = Position.Position_ID INNER JOIN Department ON Employee.Department_ID = Department.Department_ID WHERE Employee.Employee_ID = ?',
        [employeeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve employee' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

// Retrieve a specific employee by position_id
router.get('/getemppos/:positionName', (req, res) => {
    const positionName = req.params.positionName;

    db.query(
        'SELECT Employee.*, Position.Position_Name, Department.Department_name FROM Employee INNER JOIN Position ON Employee.Position_ID = Position.Position_ID INNER JOIN Department ON Employee.Department_ID = Department.Department_ID WHERE Position.Position_Name = ?;',
        [positionName],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve employee' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json(results);
            }
        }
    );
});

// Retrieve a specific employee by department_id
router.get('/getempdep/:departmentName', (req, res) => {
    const departmentName = req.params.departmentName;

    db.query(
        'SELECT Employee.*, Position.Position_Name, Department.Department_name FROM Employee INNER JOIN Position ON Employee.Position_ID = Position.Position_ID INNER JOIN Department ON Employee.Department_ID = Department.Department_ID WHERE Department.Department_Name = ?;',
        [departmentName],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve employee' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json(results);
            }
        }
    );
});

// Retrieve a specific employee by position_id and department_id
router.get('/:positionName/:departmentName', (req, res) => {
    const positionName = req.params.positionName;
    const departmentName = req.params.departmentName;

    db.query(
        'SELECT Employee.*, Position.Position_Name, Department.Department_name FROM Employee INNER JOIN Position ON Employee.Position_ID = Position.Position_ID INNER JOIN Department ON Employee.Department_ID = Department.Department_ID WHERE Position.Position_Name = ? AND Department.Department_Name = ?;',
        [positionName, departmentName],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to retrieve employee' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json(results);
            }
        }
    );
});



// Create a new employee
router.post('/', (req, res) => {
    const { Employee_ID, Employee_name, Employee_Lname, Employee_sex, Employee_tel1, Employee_tel2, Employee_SP, Position_ID, Department_ID, Employee_Lang, Employee_Image } = req.body;

    db.query(
        'INSERT INTO Employee (Employee_ID, Employee_name, Employee_Lname, Employee_sex, Employee_tel1, Employee_tel2, Employee_SP, Position_ID, Department_ID, Employee_Lang , Employee_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [Employee_ID, Employee_name, Employee_Lname, Employee_sex, Employee_tel1, Employee_tel2, Employee_SP, Position_ID, Department_ID, Employee_Lang, Employee_Image],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to create employee' });
            } else {
                res.status(201).json({ message: 'Employee created successfully' });
            }
        }
    );
});

// Update an employee
router.put('/:id', (req, res) => {
    const employeeId = req.params.id;
    const { Employee_name, Employee_Lname, Employee_sex, Employee_tel1, Employee_tel2, Employee_SP, Position_ID, Department_ID, Employee_Lang, Employee_Image } = req.body;

    db.query(
        'UPDATE Employee SET Employee_name = ?, Employee_Lname = ?, Employee_sex = ?, Employee_tel1 = ?, Employee_tel2 = ?, Employee_SP = ?, Position_ID = ?, Department_ID = ?, Employee_Lang = ?, Employee_Image = ? WHERE Employee_ID = ?',
        [Employee_name, Employee_Lname, Employee_sex, Employee_tel1, Employee_tel2, Employee_SP, Position_ID, Department_ID, Employee_Lang, Employee_Image, employeeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update employee' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json({ message: 'Employee updated successfully' });
            }
        }
    );
});

// Delete an employee
router.delete('/:id', (req, res) => {
    const employeeId = req.params.id;

    db.query(
        'DELETE FROM Employee WHERE Employee_ID = ?',
        [employeeId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to delete employee' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.status(200).json({ message: 'Employee deleted successfully' });
            }
        }
    );
});

process.on('SIGINT', () => {
    db.disconnect();
    process.exit();
});

module.exports = router;