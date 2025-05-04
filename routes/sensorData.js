const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { saveSensorData } = require('../controllers/sensorDataController');

router.post('/sensor-data', authenticateToken, authorizeRoles('admin'), saveSensorData);

module.exports = router;
