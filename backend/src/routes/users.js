const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling
const bcrypt = require('bcryptjs');

connectWithRetry().then((pool) => {
  // Get all users
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM Users', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

  // Get a user by ID
  router.get('/:id', (req, res) => {
      const user_id = req.params.id;  // Updated to use req.params.id
      pool.query('SELECT * FROM Users WHERE user_id = ?', [user_id], (error, results) => {
          if (error) throw error;
          res.json(results[0]);
      });
  });

  // Login route
 // Login endpoint
router.post('/login', (req, res) => {
  const { user_id, user_password, user_type } = req.body;
  pool.query('SELECT * FROM Users WHERE user_id = ? AND user_type = ?', [user_id, user_type], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const user = results[0];
      if (user.user_password === user_password) {
        // Password matches
        res.json({ message: 'Login successful' });
      } else {
        // Password does not match
        res.status(401).json({ message: 'Invalid credentials' });
        console.log('Invalid credentials', user_password, user.user_password, user_id, user_type, results);
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  });
});


  // Create a new user
  router.post('/', (req, res) => {
      const user = req.body;
      pool.query('INSERT INTO Users SET ?', user, (error) => {
          if (error) throw error;
          res.json({ message: 'User created' });
      });
  });

  // Update a user
  router.put('/:id/update', (req, res) => {
      const user_id = req.params.id;  // Updated to use req.params.id
      const user = req.body;
      pool.query('UPDATE Users SET ? WHERE user_id = ?', [user, user_id], (error) => {
          if (error) throw error;
          res.json({ message: 'User updated' });
      });
  });

  // Delete a user
  router.delete('/:id', (req, res) => {
      const user_id = req.params.id;  // Updated to use req.params.id
      pool.query('DELETE FROM Users WHERE user_id = ?', [user_id], (error) => {
          if (error) throw error;
          res.json({ message: 'User deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
