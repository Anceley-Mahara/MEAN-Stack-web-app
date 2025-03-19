const mysql = require('mysql');

const connectionConfig = {
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'hr_department'
};

const waitForMySQL = () => {
  return new Promise((resolve) => setTimeout(resolve, 5000));
};

const connectWithRetry = async () => {
  const connection = mysql.createConnection(connectionConfig);
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        return waitForMySQL().then(connectWithRetry).then(resolve).catch(reject);
      }
      console.log('Connected to MySQL database');
      resolve(connection);
    });
  });
};

module.exports = connectWithRetry;
