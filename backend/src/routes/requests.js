const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling

connectWithRetry().then((pool) => {
  // Get all requests
  router.get('/', (req, res) => {
      pool.query('SELECT * FROM Requests', (error, results) => {
          if (error) throw error;
          res.json(results);
      });
  });

//   // Get a request by employee ID
//   router.get('/:employee_id', (req, res) => {
//       const user_id = req.params.employee_id;  // Updated to use req.params.id
//       pool.query('SELECT * FROM Requests WHERE employee_id = ?', [user_id], (error, results) => {
//           if (error) throw error;
//           res.json(results);
//       });
//   });

   // Get a request by ID
   router.get('/:id/request-details', (req, res) => {
    const request_id = req.params.id;  // Updated to use req.params.id
    pool.query('SELECT * FROM Requests WHERE created_id = ?', [request_id], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

  // Create a new request
  router.post('/', (req, res) => {
      const user = req.body;
      pool.query('INSERT INTO Requests SET ?', user, (error) => {
          if (error) throw error;
          res.json({ message: 'Request created' });
      });
  });

  // Update a request
  router.put('/:id/update-request', (req, res) => {
      const request_id = req.params.request_id;  // Updated to use req.params.id
      const request = req.body;
      pool.query('UPDATE Requests SET ? WHERE created_id = ?', [request, request_id], (error) => {
          if (error) throw error;
          res.json({ message: 'Request updated' });
      });
  });

  // Delete a request
  router.delete('/:id', (req, res) => {
      const user_id = req.params.id;  // Updated to use req.params.id
      pool.query('DELETE FROM Requests WHERE user_id = ?', [user_id], (error) => {
          if (error) throw error;
          res.json({ message: 'Req deleted' });
      });
  });

}).catch((err) => {
  console.error('Failed to connect to MySQL:', err);
});

module.exports = router;
