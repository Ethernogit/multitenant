const express = require("express");

const router = express.Router();

// Importamos las rutas de la versión 1
const productRoutes = require("./producto");
const userRoutes = require("./usuarios");
const authRoutes = require("./auth");
const formulariosRoutes = require("./formularios");

// Definir el prefijo /v1 para las rutas
router.use("/formularios", formulariosRoutes);
router.use("/productos", productRoutes);
router.use("/usuarios", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
