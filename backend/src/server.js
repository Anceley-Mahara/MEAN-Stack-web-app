const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const bodyParser = require('body-parser'); 
const connectWithRetry = require('./db');

const employeesRouter = require('./routes/employees');
const vacanciesRouter = require('./routes/vacancies');
const leaveRouter = require('./routes/leave'); 
const usersRouter = require('./routes/users');
const payslipsRouter = require('./routes/payslips');
const apiRouter = require('./routes/api');
const jobApplicationsRouter = require('./routes/jobApplications');
const requestRouter = require('./routes/requests');


app.use(cors());

app.use(bodyParser.json());
app.use('/api/employees', employeesRouter); 
app.use('/api/vacancies', vacanciesRouter); 
app.use('/api/leave', leaveRouter); 
app.use('/api/users', usersRouter);
app.use('/api/payslips', payslipsRouter);
app.use('/api/jobApplications', jobApplicationsRouter);
app.use('/api/requests', requestRouter);
app.use('/api', apiRouter);

connectWithRetry().then(() => { 
  app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`); 
    }); }).catch((err) => { 
      console.error('Failed to connect to MySQL:', err); 
    });