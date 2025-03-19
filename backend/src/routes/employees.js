const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling

connectWithRetry().then((pool) => {
  // Get all employees
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM Employees', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Get an employee by ID
  router.get('/:id', (req, res) => {
      const id = req.params.id;
      pool.query('SELECT * FROM Employees WHERE employee_id = ?', [id], (error, results) => {
          if (error) throw error;
          res.json(results[0]);
      });
  });

  // Create a new employee
  router.post('/', (req, res) => {
      const employee = req.body;
      pool.query('INSERT INTO Employees SET ?', employee, (error) => {
          if (error) throw error;
          res.json({ message: 'Employee created' });
      });
  });

  // Update an employee
  router.put('/:id/update', (req, res) => {
      const id = req.params.id;
      const employee = req.body;
      pool.query('UPDATE Employees SET ? WHERE employee_id = ?', [employee, id], (error) => {
          if (error) throw error;
          res.json({ message: 'Employee updated' });
      });
  });

  // Delete an employee
  router.delete('/:id', (req, res) => {
      const id = req.params.id;
      pool.query('DELETE FROM Employees WHERE employee_id = ?', [id], (error) => {
          if (error) throw error;
          res.json({ message: 'Employee deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
