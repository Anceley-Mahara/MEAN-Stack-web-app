const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling

connectWithRetry().then((pool) => {
  // Get all users
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM UserProfiles ', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Get a user by ID
  router.get('/:id', (req, res) => {
      const id = req.params.user_id;
      pool.query('SELECT * FROM UserProfiles  WHERE id = ?', [id], (error, results) => {
          if (error) throw error;
          res.json(results[0]);
      });
  });

  // Create a new user
  router.post('/', (req, res) => {
      const user = req.body;
      pool.query('INSERT INTO UserProfiles  SET ?', user, (error) => {
          if (error) throw error;
          res.json({ message: 'User created' });
      });
  });

  // Update a user
  router.put('/:id', (req, res) => {
      const id = req.params.user_id;
      const user = req.body;
      pool.query('UPDATE UserProfiles  SET ? WHERE id = ?', [user, id], (error) => {
          if (error) throw error;
          res.json({ message: 'User updated' });
      });
  });

  // Delete a user
  router.delete('/:id', (req, res) => {
      const id = req.params.user_id;
      pool.query('DELETE FROM UserProfiles  WHERE id = ?', [id], (error) => {
          if (error) throw error;
          res.json({ message: 'User deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
