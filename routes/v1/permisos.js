'use strict'

const express = require('express');
const router = express.Router();
const permisosController = require('../../controllers/v1/permisosController');

// Rutas para permisos dentro de catálogos
//router.get('/', checkAuth, permisosController.getPermisos);
//router.get('/v1/catalogos/permisos/grupo/:group', checkAuth, permisosController.getPermisosByGroup);
//router.post('/v1/catalogos/permisos', checkAuth, permisosController.createPermiso);
//router.put('/v1/catalogos/permisos/:id', checkAuth, permisosController.updatePermiso);
//router.delete('/v1/catalogos/permisos/:id', checkAuth, permisosController.deletePermiso);
router.post('/permisos', permisosController.createPermiso);
router.get('/permisos', permisosController.getPermisos);
module.exports = router; 