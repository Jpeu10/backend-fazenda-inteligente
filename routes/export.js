const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { exportPDF, exportCSV } = require('../controllers/exportController');

router.get('/export/pdf', authenticateToken, authorizeRoles('admin', 'visualizador'), exportPDF);
router.get('/export/csv', authenticateToken, authorizeRoles('admin', 'visualizador'), exportCSV);

module.exports = router;
