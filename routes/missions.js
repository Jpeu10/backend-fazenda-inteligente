const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { getMissions } = require('../controllers/missionController');

router.get('/missions', authenticateToken, authorizeRoles('admin'), getMissions);

module.exports = router;
