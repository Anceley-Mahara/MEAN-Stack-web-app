const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling

connectWithRetry().then((pool) => {
  // Get all jobs
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM Vacancies', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Get a job by ID
  router.get('/:id', (req, res) => {
      const id = req.params.id;  // Updated to use req.params.id
      pool.query('SELECT * FROM Vacancies WHERE vacancy_id = ?', [id], (error, results) => {
          if (error) throw error;
          res.json(results[0]);
      });
  });

  // Create a new job
  router.post('/', (req, res) => {
      const vacancy = req.body;
      pool.query('INSERT INTO Vacancies SET ?', vacancy, (error) => {
          if (error) throw error;
          res.json({ message: 'Vacancy created' });
      });
  });

  // Update a job
  router.put('/:id', (req, res) => {
      const id = req.params.vacancy_id;  // Updated to use req.params.id
      const vacancy = req.body;
      pool.query('UPDATE Vacancies SET ? WHERE vacancy_id = ?', [vacancy, id], (error) => {
          if (error) throw error;
          res.json({ message: 'Vacancy updated' });
      });
  });

  // Delete a job
  router.delete('/:id', (req, res) => {
      const id = req.params.vacancy_id;  // Updated to use req.params.id
      pool.query('DELETE FROM Vacancies WHERE vacancy_id = ?', [id], (error) => {
          if (error) throw error;
          res.json({ message: 'Vacancy deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
