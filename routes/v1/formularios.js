const express = require('express');
const router = express.Router();
const formulariosController = require('../../controllers/v1/formulariosController');

router.post('/create', formulariosController.crearFormulario);
router.get('/:formulario', formulariosController.obtenerFormulario);
router.put('/configuraciones/:formulario', formulariosController.actualizarFormulario);
router.delete('/configuraciones/:formulario', formulariosController.eliminarFormulario);

module.exports = router;