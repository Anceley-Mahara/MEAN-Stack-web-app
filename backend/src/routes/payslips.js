const express = require('express');
const router = express.Router();
const connectWithRetry = require('../db');  // Ensure you have db.js with connection pooling
const pdf = require('html-pdf'); // You might need to install this package
const PDFDocument = require('pdfkit');

// Get all payslips
router.get('/', async (req, res) => {
    const pool = await connectWithRetry();
    pool.query('SELECT * FROM Payslips', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Route to fetch Payslipss
router.get('/:employee_id', async (req, res) => {
    const pool = await connectWithRetry();
    const employee_id = req.params.employee_id;
    pool.query('SELECT * FROM Payslips WHERE employee_id = ?', [employee_id], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Create a new payslip
router.post('/generate-payslip', async (req, res) => {
    const pool = await connectWithRetry();
    const { employee_id, month, year, basic_salary, allowances, deductions } = req.body;
    const net_salary = basic_salary + allowances - deductions;

    pool.query(
      'INSERT INTO Payslips (employee_id, month, year, basic_salary, allowances, deductions, net_salary) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [employee_id, month, year, basic_salary, allowances, deductions, net_salary],
      (error) => {
        if (error) throw error;
        res.json({ message: 'Payslip created' });
      }
    );
});

// Generate PDF for a specific payslip
// Generate PDF for a specific payslip
router.get('/:payslip_id/pdf', async (req, res) => {
    console.log('Received request for payslip PDF:', req.params.payslip_id);
    try {
        const pool = await connectWithRetry();
        const { payslip_id } = req.params;
        
        if (!payslip_id || isNaN(parseInt(payslip_id))) {
            console.error('Invalid payslip ID:', payslip_id);
            return res.status(400).json({ error: 'Invalid payslip ID' });
        }
        
        pool.query('SELECT * FROM Payslips WHERE payslip_id = ?', [payslip_id], (error, result) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error occurred' });
            }
            
            console.log('Query result length:', result ? result.length : 0);
            
            if (!result || result.length === 0) {
                console.log('No payslip found with ID:', payslip_id);
                return res.status(404).json({ error: 'Payslip not found' });
            }
            
            const payslip = result[0];
            console.log('Found payslip:', payslip);
            
            // Format currency values
            const formatCurrency = (value) => {
                return typeof value === 'number' ? value.toLocaleString() : value;
            };
            
            // Create PDF
            const doc = new PDFDocument();
            
            // Set response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="payslip-${payslip_id}-${payslip.month}-${payslip.year}.pdf"`);
            
            // Pipe the PDF document to the response
            doc.pipe(res);
            
            // Add content to PDF
            doc.fontSize(20).text(`Payslip for ${payslip.month} ${payslip.year}`, {align: 'center'});
            doc.moveDown();
            
            // Add payslip details
            doc.fontSize(12);
            doc.text(`Employee ID: ${payslip.employee_id}`);
            doc.text(`Basic Salary: ${formatCurrency(payslip.basic_salary)}`);
            doc.text(`Allowances: ${formatCurrency(payslip.allowances)}`);
            doc.text(`Deductions: ${formatCurrency(payslip.deductions)}`);
            doc.text(`Net Salary: ${formatCurrency(payslip.net_salary)}`);
            
            // Finalize PDF
            doc.end();
            console.log('PDF generated successfully');
            
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a payslip
router.put('/:id', async (req, res) => {
    const pool = await connectWithRetry();
    const id = req.params.payslip_id;
    const payslip = req.body;
    pool.query('UPDATE Payslips SET ? WHERE id = ?', [payslip, id], (error) => {
        if (error) throw error;
        res.json({ message: 'Payslip updated' });
    });
});

// Delete a payslip
router.delete('/:id', async (req, res) => {
    const pool = await connectWithRetry();
    const id = req.params.payslip_id;
    pool.query('DELETE FROM Payslips WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.json({ message: 'Payslip deleted' });
    });
});

module.exports = router;
