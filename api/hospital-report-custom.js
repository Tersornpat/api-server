const express = require('express');
const router = express.Router();
const db = require('../ConnectDB');

router.get('/confirm/:id', (req, res) => {
    const reportId = req.params.id;

    const sql = `
    UPDATE Report
    SET Status='confirm'
    WHERE Report_ID = ?
    `
    db.query(sql,[reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update status[confirm] at report table' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report status not found' });
            } else {
                res.status(200).json({ message: 'Report updated status successfully' });
            }
        })
})

router.get('/cancel/:id', (req, res) => {
    const reportId = req.params.id;
    
    const sql = `
    UPDATE Report
    SET Status='canceled'
    WHERE Report_ID = ?
    `
    db.query(sql,[reportId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Failed to update status[cancel] at report table' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Report status not found' });
            } else {
                res.status(200).json({ message: 'Report updated status successfully' });
            }
        })
})

router.put('/update-report-date/:id', (req, res) => {
    const reportId = req.params.id;
    const { report_date, status } = req.body;

    const sql = `
    UPDATE Report
    SET Report_Date = ?, Status = ?
    WHERE Report_ID = ? 
    `

    console.log(`Report-Date: ${report_date} \nStatus: ${status}`);
    
    db.query(sql,[report_date, status, reportId],
        (error, results) => {
            if (error) {
                // console.log(error);
                res.status(500).json({ error: `Failed to update report-date: ${report_date + " : " + status}  at report table` });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: `Report report-date: ${report_date + " : " + status} cannot update` });
            } else {
                res.status(200).json({ message: `Report updated [report_date: ${report_date}] - ${status}] successfully` });
            }
        })
})

module.exports = router;
