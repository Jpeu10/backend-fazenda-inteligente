const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { getPlants, getPlantById } = require('../controllers/plantController');

router.get('/plants', authenticateToken, authorizeRoles('admin', 'visualizador'), getPlants);
router.get('/plants/:id', authenticateToken, authorizeRoles('admin', 'visualizador'), getPlantById);

module.exports = router;
