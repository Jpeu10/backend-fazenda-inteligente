const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { uploadImage } = require('../controllers/imageController');

router.post('/upload-image', authenticateToken, authorizeRoles('admin', 'visualizador'), upload.single('image'), uploadImage);

module.exports = router;
