const express = require('express');
const router = express.Router();
const catalogosController = require('../../controllers/v1/catalogosController');

router.post('/categorias', catalogosController.crearCategoria);
router.get('/categorias', catalogosController.obtenerCategorias);
router.delete('/categoria/:idcategoria', catalogosController.eliminarCategoria);
router.post('/subcategorias', catalogosController.crearSubcategoria);
router.get('/subcategorias/:idcategoria', catalogosController.obtenerSubcategorias);
router.delete('/subcategorias/:idsubcategoria', catalogosController.eliminarSubcategoria);

router.post('/roles', catalogosController.crearRole);
router.get('/roles', catalogosController.obtenerRoles);
router.put('/roles/:roleId/permisos', catalogosController.actualizarPermisosRol);

module.exports = router;