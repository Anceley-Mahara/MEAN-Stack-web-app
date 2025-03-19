const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling

connectWithRetry().then((pool) => {
  // Get all leave records
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM LeaveApplications', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Get a LeaveApplications record by ID
  router.get('/:employee_id', (req, res) => {
      const employee_id = req.params.employee_id;  // Updated to use req.params.id
      pool.query('SELECT * FROM LeaveApplications WHERE employee_id = ?', [employee_id], (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Create a new LeaveApplications record
  router.post('/', (req, res) => {
      const leave = req.body;
      pool.query('INSERT INTO LeaveApplications SET ?', leave, (error) => {
          if (error) throw error;
          res.json({ message: 'Leave record created' });
      });
  });

  // Update a leave record
  router.put('/:id', (req, res) => {
      const created_id = req.params.created_id;  // Updated to use req.params.id
      const leave = req.body;
      pool.query('UPDATE LeaveApplications SET ? WHERE created_id = ?', [leave, created_id], (error) => {
          if (error) throw error;
          res.json({ message: 'Leave record updated' });
      });
  });

  // Delete a leave record
  router.delete('/:id', (req, res) => {
      const created_id = req.params.id;  // Updated to use req.params.id
      pool.query('DELETE FROM LeaveApplications WHERE created_id = ?', [created_id], (error) => {
          if (error) throw error;
          res.json({ message: 'Leave record deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
