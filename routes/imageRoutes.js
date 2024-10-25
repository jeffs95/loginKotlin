// routes/imageRoutes.js
const express = require('express');
const { addImage, getUserImages } = require('../controllers/imageController');

const router = express.Router();

router.post('/', addImage); // Ruta para agregar imagen
router.get('/:user_id', getUserImages); // Ruta para obtener imágenes de un usuario

module.exports = router;
