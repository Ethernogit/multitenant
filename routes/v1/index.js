const express = require("express");

const router = express.Router();

// Importamos las rutas de la versión 1
const productRoutes = require("./producto");
const userRoutes = require("./usuarios");

// Definir el prefijo /v1 para las rutas
router.use("/productos", productRoutes);
router.use("/usuarios", userRoutes);

module.exports = router;
