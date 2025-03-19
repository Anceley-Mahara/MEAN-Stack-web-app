const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling

connectWithRetry().then((pool) => {
  // Get all job applications
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM JobApplications', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Get an application by ID
  router.get('/:created_id', (req, res) => {
      const id = req.params.created_id;
      pool.query('SELECT * FROM JobApplications WHERE created_id = ?', [id], (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Create a new application
  router.post('/', (req, res) => {
      const application = req.body;
      pool.query('INSERT INTO JobApplications SET ?', application, (error) => {
          if (error) throw error;
          res.json({ message: 'Job created' });
      });
  });

  // Update an application
  router.put('/:id', (req, res) => {
      const id = req.params.created_id;
      const application = req.body;
      pool.query('UPDATE Job_pplications SET ? WHERE id = ?', [application, id], (error) => {
          if (error) throw error;
          res.json({ message: 'Job Application updated' });
      });
  });

  // Delete an application
  router.delete('/:id', (req, res) => {
      const id = req.params.created_id;
      pool.query('DELETE FROM JobApplications WHERE id = ?', [id], (error) => {
          if (error) throw error;
          res.json({ message: 'Job Application deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
